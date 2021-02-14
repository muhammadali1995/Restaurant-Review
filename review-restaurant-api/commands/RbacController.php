<?php


namespace app\commands;

use Yii;
use yii\console\Controller;

class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = Yii::$app->authManager;
        $auth->removeAll();

        //add "createRate" permission
        $createRate = $auth->createPermission('createRate');
        $createRate->description = 'Rate a restaurant';
        $auth->add($createRate);


        //add 'createComment' permission

        $createComment = $auth->createPermission('createComment');
        $createComment->description = 'Leave a comment for a restaurant';
        $auth->add($createComment);


        //add "regularUser" role and give this role the "createComment" and "createRate" permissions

        $regularUser = $auth->createRole('regularUser');
        $auth->add($regularUser);
        $auth->addChild($regularUser, $createRate);
        $auth->addChild($regularUser, $createComment);


        //add 'createRestaurant' permission
        $createRestaurant = $auth->createPermission('createRestaurant');
        $createRestaurant->description = "Create  a restaurant";
        $auth->add($createRestaurant);

        //add 'createReplyToComment' permission

        $createReplyToComment = $auth->createPermission("createReplyToComment");
        $createReplyToComment->description = "Reply to a comment";
        $auth->add($createReplyToComment);


        //add 'owner' role and give this role the "createRestaurant" and "createReplyToComment" permissions
        $owner = $auth->createRole("owner");
        $auth->add($owner);
        $auth->addChild($owner, $createRestaurant);
        $auth->addChild($owner, $createReplyToComment);


    }
}