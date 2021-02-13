<?php


namespace app\modules\controllers;


use yii\rest\ActiveController;

class TestController extends ActiveController
{
    public $modelClass = "app\models\User";

    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
            ],
        ];
    }

    public function actionIndex()
    {
        return "Hello Rest";
    }
}