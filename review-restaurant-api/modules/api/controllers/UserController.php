<?php

namespace app\modules\api\controllers;

use app\models\User;
use app\modules\api\models\LoginForm;
use app\modules\api\models\RegisterForm;
use Yii;
use yii\data\Pagination;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

class UserController extends ActiveController
{

    public $modelClass = "app\models\User";

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
            'except' => [
                'options',
                'login',
                'register']
        ];

        // remove authentication filter
        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);

        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
        ];

        // re-add authentication filter
        $behaviors['authenticator'] = $auth;

        return $behaviors;
    }


    public function checkAccess($action, $model = null, $params = [])
    {
        if ($action == 'index' || $action == 'update' || $action == 'delete' || $action == 'view') {
            if (!Yii::$app->user->can("admin")) {
                throw new ForbiddenHttpException('Permission denied: you dont have access to users list');
            }
        }
    }

    public function actions()
    {
        $actions = parent::actions();

        // customize the data provider preparation with the "prepareDataProvider()" method
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];

        //unsetting update function to customize
        unset($actions['update']);
        unset($actions['view']);
        unset($actions["create"]);
        unset($actions['delete']);
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

        $query = User::find();

        //select all users except admins
        $countQuery = clone $query;
        $pages = new Pagination(['totalCount' => $countQuery->count(), 'defaultPageSize' => 10]);
        $rows = $query->select('user.id, user.firstname, user.lastname, user.email, auth_assignment.item_name as role')
            ->leftJoin('auth_assignment', '`auth_assignment`.`user_id` = `user`.`id`')
            ->offset($offset)
            ->andWhere(['<>', 'auth_assignment.item_name', 'admin'])
            ->limit($pages->limit)
            ->all();
        return [
            'rows' => $rows,
            'total' => $pages->totalCount
        ];
    }

    public function actionView($id)
    {

        $this->checkAccess('view');

        $user = User::find()->select(['id', 'firstname', 'lastname'])->where(['id' => $id])->one();
        if (isset(Yii::$app->authManager->getRolesByUser($id)['admin']) || (!isset($user))) {
            //if the user is trying to get admin, throw not found exception or user not found
            throw new NotFoundHttpException("Requested resource not found");
        }

        return $user;
    }

    public function actionUpdate()
    {

        $this->checkAccess('update');


        $queryParams = Yii::$app->request->getQueryParams();

        $request = Yii::$app->request->getBodyParams();

        $model = User::findOne(['id' => $queryParams['id']]);

        //if model does not exist throw error
        if (!isset($model)) {
            throw new NotFoundHttpException('User with provided id not found');
        }
        // if password is updated, update the password_hash through setPassword();
        if (isset($request['password'])) {
            $password = trim($request['password']);
            if (strlen($password) < 8) {
                throw new BadRequestHttpException("Password should be 8 or more characters or it can not contain white spaces");
            }

            $model->setPassword($password);
        }

        $model->setAttribute('firstname', $request['firstname']);
        $model->setAttribute('lastname', $request['lastname']);

        if ($model->validate() && $model->save()) {
            return User::find()->select(['id', 'firstname', 'lastname'])->where(['id' => $model->getId()])->one();
        }
        //validation error
        Yii::$app->response->statusCode = 400;
        return [
            'errors' => $model->errors
        ];
    }


    public function actionLogin()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->login()) {
            return $model->getUser();
        }

        //validation error
        Yii::$app->response->statusCode = 400;
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
        Yii::$app->response->statusCode = 400;
        return [
            'errors' => $model->errors
        ];
    }


    public function actionDelete()
    {
        $this->checkAccess('delete');

        $userId = Yii::$app->request->getQueryParam('id');
        $model = User::findOne($userId);
        if (isset(Yii::$app->authManager->getRolesByUser($userId)['admin']) || (!isset($model))) {
            //if the user is trying to delete admin, throw not found exception or user not found
            throw new NotFoundHttpException("Requested resource not found");
        }

        return $model->delete();
    }
}
