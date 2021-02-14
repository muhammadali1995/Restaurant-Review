<?php

namespace app\models;

use Yii;

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
 *
 * @property Restaurant[] $restaurants
 * @property Review[] $reviews
 */
class Users extends \yii\db\ActiveRecord
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
            [['firstname', 'lastname', 'access_token', 'access_token_expire_at', 'created_at', 'update_at', 'password_hash', 'email'], 'required'],
            [['access_token_expire_at', 'created_at', 'update_at'], 'safe'],
            [['firstname', 'lastname', 'access_token', 'password_hash', 'email'], 'string', 'max' => 256],
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
        ];
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
}
