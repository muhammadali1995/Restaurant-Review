<?php

namespace app\modules\api\resources;

use app\models\User;

class UserResource extends User
{
    public function fields()
    {
        return ['id', 'email', 'access_token'];
    }
}