<?php

namespace app\modules\api\controllers;

use app\models\Restaurant;
use app\models\Review;
use app\modules\api\resources\RestaurantResource;
use Yii;
use yii\data\Pagination;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

class RestaurantController extends ActiveController
{
    public $modelClass = "app\models\Restaurant";

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // remove authentication filter
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
        ];
        $auth = $behaviors  ['authenticator'];
        unset($behaviors['authenticator']);

        // add CORS filter

        $behaviors['corsFilter'] ['class'] = Cors::class;

        // re-add authentication filter
        $behaviors['authenticator'] = $auth;
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        return $behaviors;
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action == 'create') {
            if (!Yii::$app->user->can("owner")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access for ' . $action);
            }
            // create a restaurant with a different


        } else if ($action == 'delete' || $action == 'update') {
            if (!Yii::$app->user->can("admin")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access for ' . $action);
            }
        }
    }


    public function actions()
    {
        $actions = parent::actions();

        // customize the data provider preparation with the "prepareDataProvider()" method
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        unset($actions['view']);

        return $actions;
    }


    public function prepareDataProvider()
    {

        //get query params sent by the client
        $queryParams = Yii::$app->request->queryParams;


        //offset for getting the targeted page data
        $offset = 0;


        if (isset($queryParams['page'])) {
            $offset = ($queryParams['page'] - 1) * 10;
        }

        // prepare and return a data provider for the "index" action
        $query = Restaurant::find()
            ->select('restaurant.id, 
                         restaurant.name,
                         restaurant.address,
                         restaurant.description, 
                         AVG(review.rating) as averageRating')
            ->joinWith('reviews')->groupBy('restaurant.id')->orderBy('averageRating desc');

        if (Yii::$app->user->can("owner")) {
            $ownerId = Yii::$app->user->getId();
            if (isset($ownerId)) {
                $query->with('reviewAggregation')->where(['owner' => $ownerId]);
            }
        }


        if (isset($queryParams['rating']) && ((int)$queryParams['rating']) > 0) {
            $query->andHaving(['>=', 'averageRating', $queryParams['rating']]);
        }

        $countQuery = clone $query;
        $pages = new Pagination(['totalCount' => $countQuery->count(), 'defaultPageSize' => 10]);

        return [
            'rows' => $query->offset($offset)->limit($pages->limit)->asArray()->all(),
            'total' => $pages->totalCount
        ];
    }


    public function actionView()
    {
        $queryParam = Yii::$app->request->getQueryParams();

        $id = $queryParam['id'];
        if (isset($id)) {

            $query = RestaurantResource::find()->with(['reviews.user', 'comments.user']);

            if (Yii::$app->user->can('owner')) {
                //if the currently logged in user is not the owner of the restaurant then throw error
                $restaurant = Restaurant::findOne($id);
                if (!isset($restaurant) || $restaurant->owner != Yii::$app->user->id) {
                    throw new  NotFoundHttpException("Requested resource not found");
                }
                $query->with(['reviewAggregation', 'reviews.user', 'comments.user']);
            }
            $result = $query->where(['id' => $id])->one();

            if (isset($result)) {

                $statResult = Review::find()->select('avg(rating) as avg_rating, 
                            max(rating) as max_rating, 
                            min(rating) as min_rating')
                    ->where(['restaurant_id' => $id])->asArray()->one();


                //find average of the reviews
                $result['averageRating'] = round($statResult['avg_rating'], 2);

                //find the maximum rating from the reviews of the restaurant and select the latest review with that max rating
                $result['highestReview'] = Review::find()->with('user')
                    ->where(['rating' => $statResult['max_rating']])
                    ->andWhere(['restaurant_id' => $id])
                    ->orderBy('created_at desc')
                    ->asArray()
                    ->one();

                //find the minimum rating from the reviews of the restaurant and select the latest review with that minimum rating

                $result['lowestReview'] = Review::find()
                    ->with("user")
                    ->where(['rating' => $statResult['min_rating']])
                    ->andWhere(['restaurant_id' => $id])
                    ->orderBy('created_at')
                    ->asArray()
                    ->one();

                return $result;
            }
        }

        throw new NotFoundHttpException("Requested resource not found");


    }

}
