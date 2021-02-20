<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "comment".
 *
 * @property int $id
 * @property string $comment
 * @property int $user_id
 * @property int $restaurant_id
 * @property string|null $reply
 * @property string $created_at
 * @property string $update_at
 *
 * @property Restaurant $restaurant
 * @property User $user
 */
class Comment extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'comment';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['comment', 'restaurant_id'], 'required'],
            [['comment', 'reply'], 'string'],
            [['user_id', 'restaurant_id'], 'integer'],
            [['created_at', 'update_at'], 'safe'],
            [['restaurant_id'], 'exist', 'skipOnError' => true, 'targetClass' => Restaurant::className(), 'targetAttribute' => ['restaurant_id' => 'id']],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['user_id' => 'id']],
        ];
    }


    public function beforeSave($insert)
    {
        $now = date("Y-m-d H:i:s");
        if ($this->isNewRecord) {
            $this->created_at = $now;
            $this->user_id = Yii::$app->user->getId();
        }
        $this->update_at = $now;
        return parent::beforeSave($insert);
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'comment' => 'Comment',
            'user_id' => 'User ID',
            'restaurant_id' => 'Restaurant ID',
            'reply' => 'Reply',
            'created_at' => 'Created At',
            'update_at' => 'Update At',
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
