<?php


namespace app\modules\api\resources;


use app\models\Restaurant;

class RestaurantResource extends Restaurant
{
    public $lowestReview;
    public $highestReview;
    public $averageRating;

    public function fields()
    {
        return ['id', 'name', 'address', 'description', 'averageRating', 'highestReview', 'lowestReview'];
    }
}