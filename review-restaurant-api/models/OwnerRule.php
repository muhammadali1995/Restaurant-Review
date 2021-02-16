<?php


namespace app\models;


use yii\rbac\Item;
use yii\rbac\Rule;

class OwnerRule extends Rule
{

    public $name = 'isOwner';

    //rule to check if the restaurant reviewed by is owned by the user
    public function execute($user, $item, $params)
    {
        return isset($params['review']) ? $params['review']->restaurant->owner == $user : false;
    }
}