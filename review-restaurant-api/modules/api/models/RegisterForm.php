<?php

namespace app\modules\api\models;

use app\models\User;
use app\models\UserRoles;
use app\modules\api\resources\UserResource;
use Yii;
use yii\base\Model;

/**
 * LoginForm is the model behind the login form.
 *
 * @property-read User|null $user This property is read-only.
 *
 */
class RegisterForm extends Model
{

    public $email;
    public $password;
    public $password_repeat;
    public $role;
    public $firstname;
    public $lastname;

    public $_user = false;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [

            //email, firstname, lastname, password can not be only whitespace
            [['email', 'firstname', 'lastname', 'password'], 'trim'],
            // email and password are both required
            ['email', 'unique', 'targetClass' => '\app\modules\api\resources\UserResource', 'message' => 'This email has already been taken'],
            //required fields
            [['email', 'password', 'firstname', 'lastname', 'role', 'password_repeat'], 'required'],
            // email should be of type email
            ['email', 'email'],
            //['password', 'length', 'min' => 8, 'message' => "Password should be more than 8 characters"],
            ['password', 'string', 'min' => 8, 'message' => "New password must contain at least 8 characters"],
            // password and password_repeat validation
            ['password', 'compare', 'compareAttribute' => 'password_repeat'],
            //role should be one of these: owner, admin or regularUser
            ['role', 'in', 'range' => [UserRoles::ADMIN, UserRoles::OWNER, UserRoles::REGULAR_USER]]
        ];
    }


    public function register()
    {
        if ($this->validate()) {
            $security = Yii::$app->security;
            $this->_user = new UserResource();
            $this->_user->firstname = $this->firstname;
            $this->_user->lastname = $this->lastname;
            $this->_user->email = $this->email;
            $this->_user->access_token = $security->generateRandomString(255);
            $this->_user->password_hash = $security->generatePasswordHash($this->password);
            $this->_user->auth_key = $security->generateRandomString(255);
            $this->_user->access_token_expire_at = date("Y-m-d H:i:s");

            if ($this->_user->save()) {
                return true;
            }
        }
        return false;
    }
}
