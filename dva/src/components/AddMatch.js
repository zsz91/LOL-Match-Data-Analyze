/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import FormItemDiy from '../../public/components/FormItemDiy';
import {Col, Form, message, Row, Button} from "antd";

/**
 *
 */
export default class AddMatch  extends React.Component {
  constructor(props) {
    super(props);
    console.log('AddmatchProps',this.props);
    this.state={
        newMatch:{
          name: '',
          searson_year: '',
          searson_number: '',
        },
        matchId:'1',
        boList: this.props.boList,
        matchList:this.props.matchList,
        matchType:{
          bo_number:'',
          name:'',
        },
        areaList:{
          name:'',
        },
        matchBasicData:{
          area_list:[],
          match_team:[],
          match_type:[],

        },
        matchTeam:{
          name: '',
          team_id: '',
          team_area: '',
        }

    };
  }

  componentDidMount() {
    this.getMatchBasicData();
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
  };

  stateChange = (key,value) => {
    this.setState({
      [key]:value
    });
  };

  matchChange = (key,value) => {
    this.setState({
      [key]:value
    },()=>{
      this.getMatchBasicData();
    });
  };

  objectStateChange = (key, value,objKey = 'newMatch') => {
    let newState = this.state[objKey];
    newState[key] = value;
    this.stateChange(objKey,newState);
  };

  newMatchStateChange = (key, value)=>{
    this.objectStateChange(key,value,'newMatch');
  };

  matchTypeStateChange = (key,value) => {
    this.objectStateChange(key,value,'matchType');
  };

  areaListStateChange = (key,value) => {
    this.objectStateChange(key,value,'areaList');
  };

  submitMatchList = () => {
    this.props.service.submitMatchList(this.state.newMatch).then((res)=>{
      this.stateChange('matchList',res.data);
    });
  };

  submitMatchType = () => {
    let data = this.state.matchType;
    data.match_id = this.state.matchId;
    this.props.service.submitMatchType(data).then((res)=>{
      this.getMatchBasicData();
    });
  };

  submitAreaList = () => {
    let data = this.state.areaList;
    data.match_id = this.state.matchId;
    this.props.service.submitAreaList(data).then((res)=>{
         this.getMatchBasicData();
    });
  };

  getMatchBasicData = () => {
    this.props.service.getMatchBasicData(this.state.matchId).then((res)=>{
         this.stateChange('matchBasicData',res.data);
    });
  };

  submitMatchTeam = () => {

  };

  render() {

    const newMatchConfig = [
      {
        label: '赛事名称',
        handleChange: this.newMatchStateChange,
        value: this.state.newMatch.name,
        type: 'Input',
        keyName: 'name',
      },
      {
        label: 'searson_year',
        handleChange: this.newMatchStateChange,
        value: this.state.newMatch.searson_year,
        type: 'Input',
        keyName: 'searson_year',
      },
      {
        label: 'searson_number',
        handleChange: this.newMatchStateChange,
        value: this.state.newMatch.searson_number,
        type: 'Input',
        keyName: 'searson_number',
      },
    ];
    const newMatchTypeConfig = [
      {
        label: '选择赛事',
        handleChange: this.matchChange,
        value: this.state.matchId,
        options: this.state.matchList,
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'matchId',
      },
      {
        label: 'boNumber',
        handleChange: this.matchTypeStateChange,
        value: this.state.matchType.bo_number,
        options: [{id:'1'},{id:'2'},{id:'3'},{id:'4'},{id:'5'},],
        optionKey: 'id',
        optionName: 'id',
        type: 'Select',
        keyName: 'bo_number',
      },
      {
        label: '名称',
        handleChange: this.matchTypeStateChange,
        value: this.state.matchType.name,
        type: 'Input',
        keyName: 'name',
      },
    ];
    const newAreaList = [
      {
        label: '选择赛事',
        handleChange: this.matchChange,
        value: this.state.matchId,
        options: this.state.matchList,
        optionKey: 'id',
        optionName: 'name',
        type: 'Select',
        keyName: 'matchId',
      },
      {
        label: '名称',
        handleChange: this.areaListStateChange,
        value: this.state.areaList.name,
        type: 'Input',
        keyName: 'name',
      },
    ];
    const newMatchTeam = [
      {
        label: '战队名称',
        handleChange: this.areaListStateChange,
        value: this.state.areaList.name,
        type: 'Input',
        keyName: 'name',
      },
    ];
    return (
      <div>
        <h3>增加赛事</h3>
        <Col>
          <Form layout="inline">
          {newMatchConfig.map((item,index)=>{
            return <FormItemDiy  key={item.keyName} {...item}/>
          })}
          <Button onClick={()=>{this.submitMatchList()}}>
            提交
          </Button>
          </Form>
        </Col>
        <div>
          <h3>增加赛事阶段</h3>
          <Col>
            <Form layout="inline">
              {newMatchTypeConfig.map((item,index)=>{
                return <FormItemDiy  key={item.keyName} {...item}/>
              })}
              <Button onClick={()=>{this.submitMatchType()}}>
                提交
              </Button>
            </Form>
          </Col>
          <div>
            {JSON.stringify(this.state.matchBasicData.match_type)}
          </div>
        </div>
        <div>
          <h3>增加赛事队伍分组</h3>
          <Col>
            <Form layout="inline">
              {newAreaList.map((item,index)=>{
                return <FormItemDiy  key={item.keyName} {...item}/>
              })}
              <Button onClick={()=>{this.submitAreaList()}}>
                提交
              </Button>
            </Form>
          </Col>
          <div>
            {JSON.stringify(this.state.matchBasicData.area_list)}
          </div>
        </div>
       {/* <div>
          <h3>增加赛事队伍</h3>
          <Col>
            <Form layout="inline">
              {newMatchTeam.map((item,index)=>{
                return <FormItemDiy  key={item.keyName} {...item}/>
              })}
              <Button onClick={()=>{this.submitAreaList()}}>
                提交
              </Button>
            </Form>
          </Col>
        </div>*/}
      </div>);
  }
}
AddMatch.propTypes = {};
AddMatch.defaultProps = {};
