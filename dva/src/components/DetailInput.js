/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Col, Row, Form, Button, message, Table} from "antd";
import FormItemDiy from "../../public/components/FormItemDiy";

/**
 *
 */
export default class DetailInput  extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      detailPage:1,
      gameList: [],
      detailList: [],
      chooseGame:null,
      count: 20,
      detailCount: 20,
      data: {
        game_id: 1,     // 比赛id
        blue: 1,        // 蓝色方
        first_blood: 1, // 一血方
        number: 1, // 第几场比赛
        five_kill: 1, // 首先达到5次击杀的队伍
        ten_kill: 1,   // 首先达到10次击杀的队伍
        use_time: '00:35:00', // 游戏时长 单位秒
    // red : 1,        // 红色方
    // five_kill_win: 1,  // 首先达到5次击杀的队伍 并获胜
    // fb_win: 1,  // 拿到1血的队伍是否获胜
    // ten_kill_win:
    // blue_win: 1,  // 是否是蓝色方获胜
  },
    };
  }

  stateChange = (key,value) => {
    this.setState({
      [key]:value
    });
  };
  shouldComponentUpdate(nextProps,nextState){
    return true;
  };

  getGameListNoDetail = () => {  //根据赛事id 和比赛类型 获取10场未录入详情的比赛.
      this.props.service.getGameListNoDetail(this.props.matchId, this.props.boType, this.state.page).then((res)=>{
           for(let item of res.data){
             for(let i of this.props.teamList){
               if(item.win === i.id){
                 item['winName'] = i.name;
               }
               if(item.lose === i.id){
                 item['loseName'] = i.name;
               }
             }
           }
        this.stateChange('gameList',res.data);
        this.stateChange('count',res.other.count);
        this.getGameDetail(1);
      });
  };

  selectOneGame = (item) =>{
    this.stateChange('chooseGame',item);
    let data = this.state.data;
    data = {
        game_id: item.id,     // 比赛id
        blue: item.win,        // 蓝色方
        blueName: item.winName,
        red: item.lose,        // 红色方
        redName: item.loseName,
        first_blood: item.win, // 一血方
        number: 1, // 第几场比赛
        five_kill: item.win, // 首先达到5次击杀的队伍
        ten_kill: item.win,   // 首先达到10次击杀的队伍
        use_time: '00:35:00',// 游戏时长 单位秒
    };
    this.stateChange('data',data);
  };

  changeColor = () => {
    let data = this.state.data;
    let changeTemp = {
      name: data.blueName,
      color: data.blue,
    };
    data.blue = data.red;
    data.blueName = data.redName;
    data.red = changeTemp.color;
    data.redName = changeTemp.name;
    this.stateChange('data',data);
  };

  dataChange = (key, value) => {
    let data = this.state.data;
    data[key] = value;
    this.stateChange('data',data);
  };

  postDetailData = () =>{
    let data = this.state.data;
    let winId = this.state.chooseGame.win;
    data.five_kill_win = winId === data.five_kill ? 1 : 0;
    data.fb_win = winId === data.first_blood ? 1 : 0;
    data.ten_kill_win = winId === data.ten_kill ? 1 : 0;
    data.blue_win = winId === data.blue ? 1 : 0;
    this.props.service.postDetailData(data).then((res)=>{
          message.info(res.data);
    });
  };

  getGameDetail = (page) => {
    this.props.service.getGameDetail(this.props.matchId, this.props.boType, page).then((res)=>{
      for(let item of res.data){
        for(let i of this.props.teamList){
          if(item.blue === i.id){
            item['blueName'] = i.name;
          }
          if(item.red === i.id){
            item['redName'] = i.name;
          }
        }
      }
      this.stateChange('detailList',res.data);
      this.stateChange('detailCount',res.other.count);
    });
  };

  detailPageChange = (key,value) => {
    this.stateChange(key,value);
    this.getGameDetail(value);
  };

  pageSize = (count) => {
    let options = [];
    for(let i = 1; i <= Math.ceil(count/10) ; i++){
      options.push({id: i+""});
    }
    return options;
  };

  render() {
    let config = [
      {
        label: '选择分页',
        handleChange: this.stateChange,
        value: this.state.page,
        options: this.pageSize(this.state.count),
        optionKey: 'id',
        optionName: 'id',
        type: 'Select',
        keyName: 'page',
      },
    ];
    let detailConfig = [];
    if(this.state.chooseGame){
      let colorOption = [
        {
          id: this.state.chooseGame.win,
          name:this.state.chooseGame.winName,
        },
        {
          id: this.state.chooseGame.lose,
          name:this.state.chooseGame.loseName,
        }
      ];
      detailConfig = [
        {
          label: '一血方',
          handleChange: this.dataChange,
          value: this.state.data.first_blood,
          options: colorOption,
          optionKey: 'id',
          optionName: 'name',
          type: 'Select',
          keyName: 'first_blood',
        },
        {
          label: '第几局',
          handleChange: this.dataChange,
          value: this.state.data.number,
          options: [{id:1},{id:2},{id:3},{id:4},{id:5}],
          optionKey: 'id',
          optionName: 'id',
          type: 'Select',
          keyName: 'number',
        },
        {
          label: '首先达到5次击杀',
          handleChange: this.dataChange,
          value: this.state.data.five_kill,
          options: colorOption,
          optionKey: 'id',
          optionName: 'name',
          type: 'Select',
          keyName: 'five_kill',
        },
        {
          label: '首先达到10次击杀',
          handleChange: this.dataChange,
          value: this.state.data.ten_kill,
          options: colorOption,
          optionKey: 'id',
          optionName: 'name',
          type: 'Select',
          keyName: 'ten_kill',
        },
        {
          label: '比赛用时',
          handleChange: this.dataChange,
          value: this.state.data.use_time,
          type: 'TimePicker',
          keyName: 'use_time',
        },
      ];
    }

    let config2 = [
      {
        label: '录入数据显示分页',
        handleChange: this.detailPageChange,
        value: this.state.detailPage,
        options: this.pageSize(this.state.detailCount),
        optionKey: 'id',
        optionName: 'id',
        type: 'Select',
        keyName: 'detailPage',
      },
    ];


    return (
      <div>
        <Form layout="inline">
          {config.map((item,index)=>{
            return <FormItemDiy  key={item.keyName} {...item}/>
          })}
        </Form>
        <Button onClick={()=>{this.getGameListNoDetail()}}>
          提交
        </Button>
        {this.state.gameList.map((item,index)=>{
          return <p onClick={()=>{this.selectOneGame(item)}}
                    style={{cursor: 'pointer',color: this.state.chooseGame && this.state.chooseGame.id === item.id ? "red" : "black"}}
                    key={item.id}>
            {item.id},
            胜利方{item.winName},
            失败方{item.loseName},
            已录入{item.detail_list},
            总局数:{item.total_score},
            {item.date}
            </p>
        })}
        {this.state.chooseGame ?
          <Row>
            <Col>
            <span style={{color: 'blue',}}>
              蓝色方{this.state.data.blueName}
            </span>
            <span style={{cursor: 'pointer',}}
                  onClick={ ()=>{this.changeColor()} }>
              {"<=>"}
            </span>
           <span style={{color: 'red',}}>
            红色方{this.state.data.redName}
            </span>
            </Col>
            <Col><Form layout="inline">
              {detailConfig.map((item,index)=>{
                return <FormItemDiy  key={item.keyName} {...item}/>
              })}
            </Form>
              <Col>
                <Button onClick={()=>{this.postDetailData()}}>
                  提交
                </Button>
              </Col>
            </Col>
            </Row>
                            　: null}
            <Row>
              {config2.map((item, index)=>{
                return <FormItemDiy  key={item.keyName} {...item}/>
              })}
              {this.state.detailList.map((item, index)=>{
                return <p key={item.id}>
                  蓝色方:{item.blueName}
                  红色方:{item.redName}
                  <span style={{color:item.blue_win > 0 ? "blue" : "red"}}>胜利</span>
                  game_id: {item.game_id}
                  </p>;
              })}
            </Row>
      </div>);
  }
}
DetailInput.propTypes = {};
DetailInput.defaultProps = {};
