<?php


namespace app\modules\api\controllers;


use yii\rest\ActiveController;

/**
 *
 */
class BaseController extends ActiveController
{
    public $modelClass = ''; // no single table dependent

    protected function verbs()
    {
        $verbs = parent::verbs();
        $verbs = [
            'index' => ['GET', 'HEAD'],
            'view' => ['GET', 'HEAD'],
            'create' => ['POST'],
            'update' => ['PUT', 'PATCH'],
            'anyOtherAction' => ['DELETE'],
        ];
        return $verbs;
    }
}