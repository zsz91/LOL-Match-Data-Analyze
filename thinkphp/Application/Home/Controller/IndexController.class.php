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
    /*获取一个赛事的列表数据*/
    public function getGameList(){
    	$matchId = $_GET['matchId'];
    	$page = $_GET['page'];
    	$matchTeam = M('match_team')->where(array('match_id'=>$matchId))->getField('team_id',true);
    	$where['id'] = array('in',$matchTeam);
    	$teamName = M('team_list')->where($where)->getField('id,name',true);
    	$process_list = M('process_list')->getField('id,score',true);
    	$page--; //page 从0开始算
    	$count = M('game_list')->where(array('match'=>$matchId))->count();
    	$data = M('game_list')->where(array('match'=>$matchId))->limit($page*10,10)->order(array('date'=>'desc','id'=>'desc'))->field('win,date,lose,id,total_score,process')->select();
    	foreach ($data as $key => &$value) {
    		$value['win'] = $teamName[$value['win']];
    		$value['lose'] = $teamName[$value['lose']];
    		$value['process'] = $process_list[$value['process']];
    		$value['key'] = $value['id'];
    	}
    	unset($value);
    	$this->returnRes($data,array('count'=>$count));
    }

    /*game_list 数据录入*/
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
		if($check && $input['process'] != 16){
			return $this->returnRes('重复数据不能添加', '', 400);
		}else{
			$add = $M->add($input);
			$data = $M->where(array('id'=>$add))->find();
			return $this->returnRes("添加比赛数据成功$add", '');
		}
    }

    public function getGameListNoDetail(){
    	 $where['match'] = $_GET['matchId'];
         $where['type'] = $_GET['boType'];
         $page = $_GET['page'];
         $M = M('game_list');
         $page--; //page 从0开始算
         $data = $M->where($where)->order('date,id asc')->limit($page*10,10)->select();
         foreach ($data as $key => &$value) {
         	$value['detail_list'] = M('game_detail')->where(array('game_id'=>$value['id']))->count();
         }
         unset($value);
         $count = $M->where($where)->count();
         $this->returnRes($data,array('count'=>$count));
    }
    
    public function getGameDetail(){
    	 $where['match'] = $_GET['matchId'];
         $where['type'] = $_GET['boType'];
         $page = $_GET['page'] - 1 ;
         $M = M('game_list');
         $ids = $M->where($where)->order('date,id asc')->getField('id', true);
         $detailWhere['game_id'] = array('in',$ids);
         $data = M('game_detail')->order('game_id,number asc')->where($detailWhere)->limit($page*10,10)->select();
         $count =  M('game_detail')->order('game_id,number asc')->where($detailWhere)->count();
         $this->returnRes($data,array('count'=>$count));
    }

    public function postDetailData(){
    	$input = file_get_contents('php://input');
		$input = json_decode($input,true);
		$M = M('game_detail');
        $input['long_time'] = strtotime($input['use_time']) >= strtotime("00:33:00") ? 1 : 0;
		$check = $M->where(array('game_id'=> $input['game_id'], 'number'=> $input['number']))->getField('id');
		if($check){
			$this->returnRes('不能重复添加','',400);
		}else{
			$add = $M->add($input);
			$this->returnRes("添加成功$add");
		}
    }

    
}