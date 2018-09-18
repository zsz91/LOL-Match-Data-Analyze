<?php
namespace Home\Controller;
use Think\Controller;

header("Access-Control-Allow-Origin:*");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization');
class IndexController extends Controller {
	private $match_list;
	private $team_list;
    public function __construct(){
    	$this->team_list = M('team_list');
    	$this->match_list = M('match_list') -> select();
    }

    public function index(){
    }
   	
   	/*获取所有的赛事列表*/
    public function getMatchList(){	
        $this-> returnRes($this->match_list);
    }

    /*根据一个赛事id 获取这个赛事所有的战队id和名称 和赛制的BO几情况和name*/
    public function getMatchTeamByMatchId(){
    	$matchId = $_GET['matchId'];
    	$match_team = M('match_team') -> where(array('match_id'=>$matchId))->order('team_area asc')->getField('team_id',true);
    	$whete['id'] = array('in',$match_team);
    	$res_team = M('team_list')->where($where)->select();
    	$other = M('match_type') -> where(array('match_id'=>$matchId)) ->order('id asc') ->select();
    	$this->returnRes($res_team, $other);
    }

    private function returnRes($data,$otherData = ''){
    	$res = array(
    		'code' => 200,
    		'data' => $data,
    		'other' => $otherData,
    	);
    	$res = json_encode($res,JSON_UNESCAPED_UNICODE);
    	print_r($res);
    }

    private function debug($data){
    	echo '<pre>';
    	print_r($data);
    	die;
    }
}