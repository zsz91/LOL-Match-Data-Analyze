<?php
namespace Home\Controller;
use Think\Controller;

class BasicAnalyzeController extends BasicController{
	
    public $M;
    public function __construct(){
    	parent::__construct();
        $this->M = M('game_list');
    }
    public function index(){
    }

    /*根据一个或多个赛事id 返回这些赛事的一系列数据*/
    /**
      matchId 赛事id 
      update = true false 是否将计算结果更新或添加到数据库
        
    **/
    public function getBasicAnalyze(){
        $matchId = $_GET['matchId'];
        $update = $_GET['update'] || true;
       // $this->totalScore($matchId);
        $this->someContinue($matchId);

    }
    /*根据一个赛事id  
      返回该赛事按type分组的大小局统计
      用于下注 最终比分的和是 大于2.5 ? 还是小于2.5 这种类型
      用于下注 最终比分一方+1.5 一方-1.5 这种类型
      */
    private function totalScore($id){
        $wherType['match_id'] = $id;
        $wherType['bo_number'] = array('GT',1);
        $types = M('match_type')->where($wherType)->order('id')->field('name,id')->select();
        $res = [];
        for($i = 0; $i < count($types); $i++){
            $where['match'] = $id;
            $where['type'] = $types[$i]['id'];
            $where['total_score'] = array('GT',1);
            $rx = $this->M->where($where)->field(array("count(total_score)"=>"count",'total_score'))->group('total_score')->select();
            $res[$i] = array(
                'name'=> $types[$i]['name'],
                '大小局统计'=> $rx,
            );
        }
    }
    /**
    *根据一个赛事的id
    *返回该赛事 BO3 totalScore 的连续性. 2-0 2-1 连续了多少场
    **/
    private function someContinue($id){
        $where['match'] = $id;
        $where['total_score'] = array('in',[2,3]);
        $where['process'] = array('in',[1,2,3,]);
        $data = $this->M->where($where)->order('id,date asc')->field('date,total_score')->select();
        $res = '';
        $j = 0;
        for($i = 0; $i < count($data); $i++){
            if($data[$i]['total_score'] == 3){
                $res = $res.'1';
            }else{
                $res = $res.'0';
            }
            $j++;
            if($j >= 10){
              //  $res = $res.' '.$data[$i]['date'].' ';
                $j = 0;
            }
          
        }
        /*print_r(substr_count($res,'1010')); 5个0
        print_r(substr_count($res,'10101'));
        print_r(substr_count($res,'10100'));
        die;*/
        $this->debug($res);

    }
    
}