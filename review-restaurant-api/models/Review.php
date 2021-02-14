<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "review".
 *
 * @property int $id
 * @property float|null $rating
 * @property string|null $comment
 * @property int $user_id
 * @property string $updated_at
 * @property string $created_at
 * @property int $restaurant_id
 *
 * @property Restaurant $restaurant
 * @property User $user
 */
class Review extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'review';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['rating'], 'number'],
            [['comment'], 'string'],
            [['user_id', 'updated_at', 'created_at', 'restaurant_id'], 'required'],
            [['user_id', 'restaurant_id'], 'integer'],
            [['updated_at', 'created_at'], 'safe'],
            [['restaurant_id'], 'exist', 'skipOnError' => true, 'targetClass' => Restaurant::className(), 'targetAttribute' => ['restaurant_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'rating' => 'Rating',
            'comment' => 'Comment',
            'user_id' => 'User ID',
            'updated_at' => 'Updated At',
            'created_at' => 'Created At',
            'restaurant_id' => 'Restaurant ID',
        ];
    }

    /**
     * Gets query for [[Restaurant]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRestaurant()
    {
        return $this->hasOne(Restaurant::className(), ['id' => 'restaurant_id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'user_id']);
    }
}