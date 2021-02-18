<?php

namespace app\modules\api\controllers;

use app\models\Restaurant;
use Yii;
use yii\data\Pagination;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;
use yii\web\ForbiddenHttpException;

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
        if ($action == 'view' || $action == 'create') {
            if (!Yii::$app->user->can("owner")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access for ' . $action);
            }
        }
    }


    public function actions()
    {
        $actions = parent::actions();

        // customize the data provider preparation with the "prepareDataProvider()" method
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        return $actions;
    }


    public function prepareDataProvider()
    {

        //get query params sent by the client
        $queryParams = Yii::$app->request->queryParams;


        //offset for getting the targeted page data
        $offset = 0;
        if (isset($queryParams['pages'])) {
            $offset = $queryParams['pages'];
        }
        // prepare and return a data provider for the "index" action
        $query = [];
        if (Yii::$app->user->can("owner")) {
            $ownerId = Yii::$app->user->getId();
            if (isset($ownerId)) {
                $query = Restaurant::find()->where(['owner' => $ownerId]);
            }
        } else {
            $query = Restaurant::find();
        }

        $countQuery = clone $query;
        $pages = new Pagination(['totalCount' => $countQuery->count(), 'defaultPageSize' => 10]);
        return [
            'rows' => $query->offset($offset)->limit($pages->limit)->all(),
            'total' => $pages->totalCount
        ];
    }


}
