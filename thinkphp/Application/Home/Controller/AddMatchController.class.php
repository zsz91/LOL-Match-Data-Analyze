<?php
namespace Home\Controller;
use Think\Controller;
class AddMatchController extends BasicController{
	
	protected $postData;
    public function __construct(){
    	parent::__construct();
    	$input = file_get_contents('php://input');
		$this->postData = json_decode($input,true);
    }

    public function index(){

    }

    public function addMatch(){ /*添加赛事 match_list*/
    	/**
		* post match_list所需的数据 返回所有的赛事
    	**/
    	if(M('match_list')->add($this->postData)){
    		$res = M('match_list')->order('name desc')->select();
    		$this->returnRes($res);
    	}

    }

    public function addAreaList(){ /*赛事分组 area_list*/
    	 //批量插入 $data= array(array('name'=>'xx'),array('name'=>'xx'));
    	if(M('area_list')->add($this->postData)){
    		$this->returnRes();
    	}

    }

    public function getMatchBasicData($matchId = ''){
    	$matchId = isset($_GET['matchId']) ? $_GET['matchId'] : $matchId;
    	$areaList = M('area_list')->where(array('match_id'=>$matchId))->order('id asc')->getField('id,name', true);
    	$matchType = M('match_type')->where(array('match_id'=>$matchId))->order('id asc')->field('match_id', true)->select();
    	$matchTeam = M('match_team')->where(array('match_id'=>$matchId))->order('id asc')->field('match_id', true)->select();
    	foreach ($matchTeam as $key => $value) {
    		$value['team_area'] = $area_list[$value['team_area']]['name'];
    	}
    	unset($value);
    	$res = array(
    		'area_list'=> $areaList,
          	'match_team'=> $matchTeam,
          	'match_type'=> $matchType,
    	);
    	$this->returnRes($res);
    }

    public function addMatchType(){ /*赛事阶段 match_type*/
    	if(M('match_type')->add($this->postData)){
    		$this->returnRes();
    	}
    }

    public function showTeamArea(){  /*显示所有的赛区*/
    	$data = M('team_area')->order('name asc')->select();
    	$this->returnRes($data);
    }
    public function showTeamList(){ /*根据area显示对应area下面的战队*/
    	$data = M('team_list')->where(array('area'=>$this->postData['area']))->order('id asc')->select();
    	$this->returnRes($data);
    }

    public function addTeam(){ /*添加一个战队到team_list*/
    	M('team_list')->add($this->postData);
    	$data = M('team_list')->where(array('area'=>$this->postData['area']))->order('id asc')->select();
    	$this->returnRes($data);	
    }

    public function addMatchTeam(){ /*添加一个战队到一个赛事中 match_team*/
    	if(isset($this->postData['team_id'])){
    		M('match_team')->add($this->postData);
    	}
    	$teams = M('match_team')->where(array('match_id'=>$this->postData['match_id']))->order('name')->getField('team_id,team_area',true);
    	$where['id'] = array('in',$teams);
    	$teamNames = M('team_list')->where($where)->field('id,name', true);
    	foreach ($teams as $key => &$value) {
    		$value['name'] = $teamNames[$key]['name'];
    	}	
    	unset($value);
    	$this->returnRes($teamNames);
    }

}