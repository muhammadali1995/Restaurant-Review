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
 * @property User2 $owner0
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
            [['name', 'address', 'created_at', 'updated_at', 'owner'], 'required'],
            [['address', 'description'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['owner'], 'integer'],
            [['name'], 'string', 'max' => 256],
            [['owner'], 'exist', 'skipOnError' => true, 'targetClass' => User2::className(), 'targetAttribute' => ['owner' => 'id']],
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

    /**
     * Gets query for [[Owner0]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getOwner0()
    {
        return $this->hasOne(User2::className(), ['id' => 'owner']);
    }
}
