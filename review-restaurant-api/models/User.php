<?php

namespace app\models;

use Yii;
use yii\base\Exception;
use yii\base\InvalidConfigException;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string $firstname
 * @property string $lastname
 * @property string $access_token
 * @property string $access_token_expire_at
 * @property string $created_at
 * @property string $update_at
 * @property string $password_hash
 * @property string $email
 * @property string $auth_key
 *
 * @property Restaurant[] $restaurants
 * @property Review[] $reviews
 */
class User extends \yii\db\ActiveRecord implements \yii\web\IdentityInterface
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['firstname', 'lastname', 'access_token', 'password_hash', 'email', 'auth_key'], 'required'],
//            [['created_at', 'update_at'], 'required'],
            [['access_token_expire_at', 'created_at', 'update_at'], 'safe'],
            [['firstname', 'lastname', 'access_token', 'password_hash', 'email', 'auth_key'], 'string', 'max' => 256],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'firstname' => 'Firstname',
            'lastname' => 'Lastname',
            'access_token' => 'Access Token',
            'access_token_expire_at' => 'Access Token Expire At',
            'created_at' => 'Created At',
            'update_at' => 'Update At',
            'password_hash' => 'Password Hash',
            'email' => 'Email',
            'auth_key' => 'Auth Key',
        ];
    }


    public function beforeSave($insert)
    {
        $now = date("Y-m-d H:i:s");
        if ($this->isNewRecord) {
            $this->created_at = $now;
        }
        $this->update_at = $now;
        return parent::beforeSave($insert);
    }

    /**
     * Gets query for [[Restaurants]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRestaurants()
    {
        return $this->hasMany(Restaurant::className(), ['owner' => 'id']);
    }

    /**
     * Gets query for [[Reviews]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getReviews()
    {
        return $this->hasMany(Review::className(), ['user_id' => 'id']);
    }

    public static function findIdentity($id)
    {
        return static::findOne($id);
    }

    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token]);
    }

    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email]);
    }


    public function getId()
    {
        return $this->id;
    }

    public function getAuthKey()
    {
        return $this->auth_key;
    }

    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    public function generateAuthKey()
    {
        try {
            $this->auth_key = Yii::$app->security->generateRandomString();
        } catch (Exception $e) {
        }
    }

    /**
     * Validates password.
     *
     * @param string $password
     * @return bool
     *
     * @throws InvalidConfigException
     */
    public function validatePassword($password)
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    /**
     * Generates password hash from password and sets it to the model.
     *
     * @param string $password
     *
     * @throws Exception
     * @throws InvalidConfigException
     */
    public function setPassword($password)
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }


    /**
     *
     * Assign role to the user
     */


    public function assignRole($role)
    {
        $auth = Yii::$app->authManager;
        $roleTobeAssigned = $auth->getRole($role);
        if (isset($roleTobeAssigned)) {
            $auth->assign($roleTobeAssigned, $this->getId());
        } else {
            return false;
        }
    }

}
