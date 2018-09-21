<?php
namespace Home\Controller;
use Think\Controller;

class IndexController extends BasicController{
	
    public function __construct(){
    	parent::__construct();
    }
    public function index(){
    }
   	/*获取所有的赛事列表*/
    public function getMatchList(){
        $this->returnRes($this->match_list);
    }

    /*根据一个赛事id 获取这个赛事所有的战队id和名称 和赛制的BO几情况和name*/
    public function getMatchTeamByMatchId(){
    	$matchId = $_GET['matchId'];
    	$match_team = M('match_team') -> where(array('match_id'=>$matchId))->order('team_area asc')->getField('team_id',true);
    	$where['id'] = array('in',$match_team);
    	$res_team = M('team_list')-> where($where)->order('name asc')->select();
    	$other = M('match_type')-> where(array('match_id'=>$matchId))-> order('id asc')-> select();
    	$process_list = M('process_list')-> order('id asc') ->select();
    	$other = array(
    		'match_type' => $other,
    		'process_list' => $process_list,
    	);
    	$this->returnRes($res_team, $other);
    }

    public function postGameList(){
    	$input = file_get_contents('php://input');
		$input = json_decode($input,true);
		$M = M('game_list');
		$where = array(
			'date'=> $input['date'],
			'match'=> $input['match'],
			'win'=> $input['win'],
			'lose'=> $input['lose'],
 		);
		$check = $M->where($where)->getField('id');
		if($check){
			return $this->returnRes('重复数据不能添加', '', 400);
		}else{
			$add = $M->add($input);
			$data = $M->where(array('id'=>$add))->find();
			return $this->returnRes("添加比赛数据成功$add", '');
		}
    }

    
}