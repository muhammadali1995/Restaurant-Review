<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "restaurant".
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string|null $description
 * @property string $created_at
 * @property string $updated_at
 * @property int $owner
 *
 * @property Comment[] $comments
 * @property User $owner0
 * @property Review[] $reviews
 * @property int $averageReviews
 */
class Restaurant extends \yii\db\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'restaurant';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'address'], 'required'],
            [['address', 'description'], 'string'],
            [['created_at', 'updated_at', 'owner'], 'safe'],
            [['owner'], 'integer'],
            [['name'], 'string', 'max' => 256],
            [['owner'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['owner' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'address' => 'Address',
            'description' => 'Description',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
            'owner' => 'Owner',
        ];
    }


    public function beforeSave($insert)
    {
        $now = date("Y-m-d H:i:s");
        if ($this->isNewRecord) {
            $this->created_at = $now;
            $this->owner = Yii::$app->user->getId();
        }
        $this->updated_at = $now;
        return parent::beforeSave($insert);
    }

    /**
     * Gets query for [[Comments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getComments()
    {
        return $this->hasMany(Comment::className(), ['restaurant_id' => 'id'])
            ->select(['id', 'comment', 'reply', 'restaurant_id', 'user_id', 'created_at'])
            ->orderBy('created_at desc')
            ->limit(10);;
    }

    /**
     * Gets query for [[Owner0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOwner0()
    {
        return $this->hasOne(User::className(), ['id' => 'owner']);
    }

    /**
     * Gets query for [[Reviews]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getReviews()
    {
        return $this->hasMany(Review::className(), ['restaurant_id' => 'id'])
            ->select(['id',
                'rating',
                'comment',
                'created_at',
                'reply',
                'user_id',
                'restaurant_id'])->orderBy('review.created_at');
    }


    public function getReviewAggregation()
    {
        return $this->getReviews()
            ->select(['restaurant_id', 'counted' => 'count(*)'])
            ->groupBy('restaurant_id')
            ->asArray(true);
    }


}
