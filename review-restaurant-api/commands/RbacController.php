<?php


namespace app\commands;

use app\models\OwnerRule;
use Yii;
use yii\console\Controller;

class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = Yii::$app->authManager;
        $auth->removeAll();

        //add rule

        $isOwnerRule = new OwnerRule();
        $auth->add($isOwnerRule);

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
        $createReplyToComment->ruleName = $isOwnerRule->name;
        $auth->add($createReplyToComment);

        // add 'readRestaurantList' permission
        $readOwnRestaurantList = $auth->createPermission('readOwnRestaurantList');
        $readOwnRestaurantList->description = "See the list of restaurants owned by the user";
        $readOwnRestaurantList->ruleName = $isOwnerRule->name;
        $auth->add($readOwnRestaurantList);


        //add 'owner' role and give this role the "createRestaurant" and "createReplyToComment" permissions
        $owner = $auth->createRole("owner");
        $auth->add($owner);
        $auth->addChild($owner, $createRestaurant);
        $auth->addChild($owner, $createReplyToComment);


        //add 'editUser' permission
        $editUser = $auth->createPermission("editUser");
        $editUser->description = "Edit a user";
        $auth->add($editUser);


        //add 'deleteUser' permission
        $deleteUser = $auth->createPermission("deleteUser");
        $deleteUser->description = "Delete a user";
        $auth->add($deleteUser);

        //add 'editRestaurant' permission
        $editRestaurant = $auth->createPermission("editRestaurant");
        $editRestaurant->description = "Edit a restaurant";
        $auth->add($editRestaurant);

        //add 'deleteRestaurant' permission
        $deleteRestaurant = $auth->createPermission("deleteRestaurant");
        $deleteRestaurant->description = "Delete a restaurant";
        $auth->add($deleteRestaurant);

        // add 'editComment' permission
        $editComment = $auth->createPermission("editComment");
        $editComment->description = "Edit a comment";
        $auth->add($editComment);


        //add 'deleteComment' permission
        $deleteComment = $auth->createPermission('deleteComment');
        $deleteComment->description = "Delete a comment";
        $auth->add($deleteComment);

        //add 'editReview' permission
        $editReview = $auth->createPermission("editReview");
        $editReview->description = "Edit a review";
        $auth->add($editReview);

        //add 'deleteReview' permission

        $deleteReview = $auth->createPermission("deleteReview");
        $deleteReview->description = "Delete a review";
        $auth->add($deleteReview);


        //add 'admin' role and give this role following permissions
        //$editUser, $deleteUser, $editRestaurant, $deleteRestaurant, $editComment, $deleteComment, $editReview and $deleteReview;

        $admin = $auth->createRole("admin");
        $auth->add($admin);
        $auth->addChild($admin, $editUser);
        $auth->addChild($admin, $deleteUser);
        $auth->addChild($admin, $editRestaurant);
        $auth->addChild($admin, $deleteRestaurant);
        $auth->addChild($admin, $editReview);
        $auth->addChild($admin, $deleteReview);
        $auth->addChild($admin, $editComment);
        $auth->addChild($admin, $deleteComment);
    }
}