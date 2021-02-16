<?php

namespace app\modules\api\resources;

use app\models\User;

/**
 * This is the model class for returning "user resource".
 *
 */
class UserResource extends User
{

    public function fields()
    {
        return ['id', 'email', 'access_token', 'role'];
    }
}