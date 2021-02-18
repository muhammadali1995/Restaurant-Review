<?php


namespace app\modules\api\resources;


use app\models\Restaurant;

class RestaurantResource extends Restaurant
{

    public function fields()
    {
        return ['id', 'name', 'address', 'description'];
    }
}