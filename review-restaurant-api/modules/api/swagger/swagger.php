<?php

namespace app\modules\api\swagger;

/**
 * @SWG\Swagger(
 *     schemes={"http"},
 *     host="api.toptal",
 *     basePath="/api",
 *     @SWG\Info(
 *         version="1.0.0",
 *         title="Toptal test project",
 *         description="Version: __1.0.0__",
 *         @SWG\Contact(name = "mtoshpulatov1995@gmail.com")
 *     ),
 * )
 *
 * @SWG\Tag(
 *   name="user",
 *   description="User",
 *   @SWG\ExternalDocumentation(
 *     description="Find out more about our store",
 *     url="http://swagger.io"
 *   )
 * )
 */

/**
 * @SWG\Definition(
 *   @SWG\Xml(name="##default")
 * )
 */
class ApiResponse
{
    /**
     * @SWG\Property(format="int32", description = "code of result")
     * @var int
     */
    public $code;
    /**
     * @SWG\Property
     * @var string
     */
    public $type;
    /**
     * @SWG\Property
     * @var string
     */
    public $message;
    /**
     * @SWG\Property(format = "int64", enum = {1, 2})
     * @var integer
     */
    public $status;
}