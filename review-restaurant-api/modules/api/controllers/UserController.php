<?php

namespace app\modules\api\controllers;

use app\modules\api\models\LoginForm;
use app\modules\api\models\RegisterForm;
use Yii;
use yii\rest\ActiveController;

class UserController extends ActiveController
{

    public $modelClass = "app\models\User";

    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->login()) {
            return $model->getUser();
        }

        //validation error
        Yii::$app->response->statusCode = 422;
        return [
            'errors' => $model->errors
        ];
    }

    public function actionRegister()
    {
        $model = new RegisterForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->register()) {
            return $model->_user;
        }

        //validation error
        Yii::$app->response->statusCode = 422;
        return [
            'errors' => $model->errors
        ];
    }
}
