<?php

namespace app\modules\api\models;

use app\models\User;
use app\modules\api\resources\UserResource;
use Yii;

/**
 * LoginForm is the model behind the login form.
 *
 * @property-read User|null $user This property is read-only.
 *
 */
class LoginForm extends \app\models\LoginForm
{

    /**
     * Finds user by [[email]]
     *
     * @return User|null
     */
    public function getUser()
    {
        if ($this->_user === false) {
            $this->_user = UserResource::findByEmail($this->email);

            //get the roles of the user and send them back to client
            $currUserRoles = Yii::$app->authManager->getRolesByUser($this->_user->getId());
            $roles = [];
            if (isset($currUserRoles)) {
                foreach ($currUserRoles as $role) {
                    array_push($roles, $role->name);
                }
            }
            $this->_user->setRole($roles);

        }
        return $this->_user;
    }
}
