<?php
namespace Home\Controller;
use Think\Controller;

header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization');

class BasicController extends Controller {
	public $match_list;
	public function __construct(){
    	$this->match_list = M('match_list')->order('name desc')->select();
    }
    protected function returnRes($data, $otherData = '', $code = 200){
    	$res = array(
    		'code' => $code,
    		'data' => $data,
    		'other' => $otherData,
    	);
    	$res = json_encode($res,JSON_UNESCAPED_UNICODE);
    	print_r($res);
    }

    protected function debug($data){
    	echo '<pre>';
    	print_r($data);
    	die;
    }
}