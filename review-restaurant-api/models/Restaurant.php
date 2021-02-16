<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

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
 * @property User $owner0
 */
class Restaurant extends ActiveRecord
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
            [['created_at', 'updated_at'], 'safe'],
            [['owner'], 'integer'],
            [['name'], 'string', 'max' => 256],
            [['owner'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['owner' => 'id']],
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
     * Gets query for [[Owner]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOwner()
    {
        return $this->hasOne(User::className(), ['id' => 'owner']);
    }
}
