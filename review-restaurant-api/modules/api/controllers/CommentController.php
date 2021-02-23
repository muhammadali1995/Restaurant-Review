<?php


namespace app\modules\api\controllers;


use Yii;
use yii\web\ForbiddenHttpException;

class CommentController extends BaseController
{
    public $modelClass = "app\models\Comment";

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action == 'delete') {
            if (!Yii::$app->user->can("admin")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access to this action');
            }
        }
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }
}