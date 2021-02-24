<?php


namespace app\modules\api\controllers;


use app\models\Comment;
use app\models\Restaurant;
use Yii;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;
use yii\web\UnprocessableEntityHttpException;

class CommentController extends BaseController
{
    public $modelClass = "app\models\Comment";

    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action == 'create') {
            if (!Yii::$app->user->can("customer")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access to this action');
            }
        } else if ($action == 'delete' || $action == 'update') {
            if (!Yii::$app->user->can("admin")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access to this action');
            }
        } else if ($action == 'reply') {
            if (!Yii::$app->user->can("owner")) {
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

    public function actionReply()
    {
        $id = Yii::$app->request->getBodyParam('commentId');
        $model = null;
        if (isset($id)) {
            $model = Comment::findOne($id);
        }


        //if no model then throw exception
        if (is_null($model)) {
            throw new NotFoundHttpException();
        }
        $restaurant = Restaurant::findOne($model->restaurant_id);
        if ($restaurant->owner != Yii::$app->user->getId()) {
            throw new NotFoundHttpException();
        }


        if (is_null($model->reply)) {
            $model->reply = Yii::$app->request->getBodyParam('reply');
            if ($model->validate() && $model->save()) {
                return $model;
            }


            //if it can not save or does not pass validation
            Yii::$app->response->statusCode = 400;
            return [
                'errors' => $model->errors
            ];

        }

        Yii::$app->response->statusCode = 422;

        //if there is already a reply
        throw new UnprocessableEntityHttpException('The comment has already a reply');
    }
}