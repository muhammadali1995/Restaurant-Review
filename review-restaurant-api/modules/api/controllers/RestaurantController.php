<?php

namespace app\modules\api\controllers;

use Faker\Provider\Base;
use Yii;
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
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
        ];

        // re-add authentication filter
        $behaviors['authenticator'] = $auth;
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        return $behaviors;
    }

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action == 'index' || $action == 'view' || $action == 'create') {
            if (!Yii::$app->user->can("owner")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access to users list');
            }
        }
    }


    public function actionCreate()
    {
    }

}
