<?php

namespace app\modules\controllers;

class UserController extends \yii\rest\ActiveController
{
    public function actionIndex()
    {
        return $this->render('index');
    }

}
