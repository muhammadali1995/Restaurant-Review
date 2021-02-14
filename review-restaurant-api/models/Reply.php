<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "reply".
 *
 * @property int $id
 * @property int $review_id
 * @property int $user_id
 * @property string $created_at
 * @property string $updated_at
 */
class Reply extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'reply';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['review_id', 'user_id', 'created_at', 'updated_at'], 'required'],
            [['review_id', 'user_id'], 'integer'],
            [['created_at', 'updated_at'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'review_id' => 'Review ID',
            'user_id' => 'User ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
