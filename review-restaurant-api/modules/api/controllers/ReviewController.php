<?php

namespace app\modules\api\controllers;

use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;

class ReviewController extends BaseController
{

    public $modelClass = "app\models\Review";


}
