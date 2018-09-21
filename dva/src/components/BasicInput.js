/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Col, Row, Form, Button, message, Table} from "antd";
import FormItemDiy from '../../public/components/FormItemDiy';
import '../styles/bsicinput.less';

/**
 *
 */
export default class BasicInput  extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      matchId: "1", // 赛事id
      teamList: [], // 赛事战队列表
      teamWin: '1', // 获胜方战队id
      teamLose: '2', // 失败方战队id
      gameDate:null, // 比赛日期
      boList: [], // 赛事阶段列表.
      boType: '1', // 赛事阶段id
      netScore: '1', // 净胜分数 >= 1
      totalScore: '2', // 总局数 >= 1
      processList: [], //赛事进程list
      process: null, // 赛事进程id
      gameList: {
        data: [],
        count: 0,
      },
    };
    this.getTeamListOfOneMatch();
    this.getGameListOfOneMatch();
  }

  componentDidMount() {
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
  };

  stateChange = (key,value) => {
    this.setState({
      [key]:value
    });
  };

  handleNetScoreChange = (key,value) => {
    let bo_number = this.getBoNumber();
    let totalScore = Math.ceil(bo_number/2);
    if(value === 1){
      totalScore = bo_number;
    }else if(value < totalScore){
      totalScore++;
    }
    let newState = {
      totalScore:totalScore,
      netScore: value,
      process: "",
    };
    for(let item of this.state.processList){
      if(parseInt(item.total, 10) === parseInt(totalScore, 10) && parseInt(bo_number, 10) === parseInt(item.bo_number, 10)){
        newState.process = item.id + "";
        break;
      }
    }
    this.setState(newState);
  };


  getTeamListOfOneMatch = () => {
    this.props.service.teamListOfOneMatch(this.state.matchId).then((res)=>{
      this.setState({
        teamList: res.data,
        boList: res.other.match_type,
        processList:res.other.process_list,
      });
    })
  };
  getGameListOfOneMatch = (page = 1) => {
    this.props.service.getListOfOneMatch(this.state.matchId,page).then((res)=>{
      this.setState({
        gameList:{
          data: res.data,
          count: res.other.count,
        },
      });
    })
  };
  /*赛事更改*/
  handleMatchIdChange = (key, value) => {
      this.setState({
        [key]: value,
      },() => {
        this.getTeamListOfOneMatch();
        this.getGameListOfOneMatch();
      });

  };

  /*提交数据*/
  submitData = () => {
    let data = {
      match: this.state.matchId,
      date: this.state.gameDate,
      win: this.state.teamWin,
      lose: this.state.teamLose,
      net_score: this.state.netScore,
      type: this.state.boType,
      total_score: this.state.totalScore,
      process: this.state.process,
    };
    for(let item in data){
      if(!data[item]){
        message.error(`所有值都必须填写不能为空`);
        return false;
      }
    }
    this.props.service.postGameList(data).then((response)=>{
      message.info(response.data);
      if(response.code === 200){

      }
    });
    return data;
  };


  /*赛事的Bo_number 是3,5 或者1*/
  getBoNumber = () => {
    let bo_number = 1;
    for(let item2 of this.state.boList){
      if(item2.id === this.state.boType){
        bo_number = item2.bo_number;
      }
    }
    return bo_number;
  };


  /*总局数的枚举*/
  totalScoreList = () => {
    let bo_number = this.getBoNumber();
    let minNumber = Math.ceil(bo_number/2);
    let res = [];
    for(let i = minNumber; i <= bo_number; i++){
      res.push({ id: i});
    }
    return res;
  };

  /*净胜分的枚举*/
  netScoreList = () => {
    let bo_number = this.getBoNumber();
    let minNumber = Math.ceil(bo_number/2);
    let res = [];
    for(let i = 1; i <= minNumber; i++){
      res.push({ id: i});
    }

    return res;
  };

  /*比赛过程的枚举值*/
  boProcessList = () => {
    let bo_number = this.getBoNumber();
    let res = [];
    for(let item of this.state.processList){
      if(parseInt(bo_number, 10) === parseInt(item.bo_number, 10) && parseInt(this.state.totalScore, 10) === parseInt(item.total,10) ){
        res.push( {id: item.id, name: item.process});
      }
    }
   return res;
  };

  render() {

    if(!this.state.teamList.length){
      return null;
    }

    const config = [
      {
        label: '选择赛事',
        handleChange: this.handleMatchIdChange,
        value: this.state.matchId,
        options: this.props.matchList,
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'matchId',
      },
      {
        label: '赛事阶段',
        handleChange: this.stateChange,
        value: this.state.boType,
        options: this.state.boList,
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'boType',
      },
      {
        label: '对战日期',
        handleChange: this.stateChange,
        value: this.state.gameDate,
        type: 'DatePicker',
        keyName: 'gameDate',
      },
      {
        label: '获胜方',
        handleChange: this.stateChange,
        value: this.state.teamWin,
        options: this.state.teamList,
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'teamWin',
      },
      {
        label: '失败方',
        handleChange: this.stateChange,
        value: this.state.teamLose,
        options: this.state.teamList,
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'teamLose',
      },
      {
        label: '净胜分数',
        handleChange: this.handleNetScoreChange,
        value:this.state.netScore,
        options: this.netScoreList(),
        optionKey: 'id',
        optionName: 'id',
        type: 'Select',
        keyName: 'netScore',
      },
      {
        label: '总局数',
        handleChange: this.stateChange,
        value:this.state.totalScore,
        options: this.totalScoreList(),
        optionKey: 'id',
        optionName: 'id',
        type: 'Select',
        keyName: 'totalScore',
      },
      {
        label: '比赛过程',
        handleChange: this.stateChange,
        value:this.state.process,
        options: this.boProcessList(),
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'process',
      },
    ];
    const columns = [{
      title: '获胜方',
      dataIndex: 'win',
      key: 'win',
      width:60,
    },{
      title: '失败方',
      dataIndex: 'lose',
      key: 'lose',
      width:60,

    },{
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width:120,

    },{
      title: '比分',
      dataIndex: 'process',
      key: 'process',
      width:40,
    }];
    return (
      <Row>
        <Col span={24}><h2>一场比赛的基本数据录入</h2></Col>
        <Row>
          <Form layout="inline">
            {config.map((item,index)=>{
              return <FormItemDiy  key={item.keyName} {...item}/>
            })}
          </Form>

        </Row>
        <Row>
          获胜方:<br/>
          {this.state.teamList.map((item)=>{
            return <Col span={1}
                        key={item.id}>
                <Button onClick={()=>{this.stateChange('teamWin', item.id)}}
                        style={this.state.teamWin === item.id ? {color:'red'}: null}>
                {item.name}
                </Button>
                 </Col>
          })}
        </Row>
        <Row>
          失败方<br/>
          {this.state.teamList.map((item)=>{
            return <Col span={1}
                        key={item.id}

            >
              <Button onClick={()=>{this.stateChange('teamLose', item.id)}}
                      style={this.state.teamLose === item.id ? {color:'red'}: null}>
                {item.name}
              </Button>
            </Col>
          })}
        </Row>
        <br/>
        <Button onClick={()=>{this.submitData()}}>提交</Button>

        <Row style={{ height: "600px", overflowY: "auto",width: "400px", }}>
          <Table columns={columns}
                 dataSource={this.state.gameList.data}
                 rowKey='key'
                 bordered
                 scroll={{y: 450}}
                 pagination={
                   {
                     total:parseInt(this.state.gameList.count, 10),
                     onChange: (page,pageSize)=>{this.getGameListOfOneMatch(page)},
                     pageSize: 10,
                   }
                 }
          >

          </Table>
        </Row>

      </Row>

    );
  }
}
BasicInput.propTypes = {

};
BasicInput.defaultProps = {
  matchList:[],
};
