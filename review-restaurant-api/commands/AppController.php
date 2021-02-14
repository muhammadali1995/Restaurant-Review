<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\commands;

use app\models\User;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\helpers\Console;

/**
 * This command echoes the first argument that you have entered.
 *
 * This command is provided as an example for you to learn how to create console commands.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppController extends Controller
{
    /**
     * This command echoes what you have entered as the message.
     * @param string $message the message to be echoed.
     * @return int Exit code
     */
    public function actionIndex($message = 'hello world')
    {
        echo $message . "\n";

        return ExitCode::OK;
    }

    public function actionAddUser($firstname, $lastname, $email, $role, $password)
    {
        $security = \Yii::$app->security;
        $user = new User();
        $user->firstname = $firstname;
        $user->lastname = $lastname;
        $user->email = $email;
        $user->access_token = $security->generateRandomString(255);
        $user->password_hash = $security->generatePasswordHash($password);
        $user->auth_key = $security->generateRandomString(255);
        $user->access_token_expire_at = date("Y-m-d H:i:s");
        if ($user->save()) {
            Console::output("Saved");
            $user->assignRole($role);
        } else {
            var_dump($user->errors);
            Console::output("Not saved");
        }

    }
}
