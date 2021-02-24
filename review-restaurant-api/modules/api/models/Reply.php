<?php


namespace app\modules\api\models;


use yii\base\Model;

class Reply extends Model
{
    public $reply;

    /**
     * @return array the validation rules.
     */
    public function rules()
    {
        return [
            // email and password are both required
            [['reply'], 'trim'],
            [['reply'], 'required'],

            // password is validated by validatePassword()
        ];
    }
}
