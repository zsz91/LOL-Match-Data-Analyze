/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Col, Form, Row} from "antd";
import IndexComponent from "./IndexComponent";
import BasicInput from './BasicInput';
import DetailInput from './DetailInput';
import BasicAnalyze from './BasicAnalyze';
import * as service from '../services/basicApi';
import FormItemDiy from "../../public/components/FormItemDiy";

/**
 *
 */
export default class InputData  extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      matchList:[],  //赛事列表 所有比赛
      matchId: "1", // 赛事id
      boList: [], // 赛事阶段列表.
      teamList: [], //赛事战队列表
      nameList:[], // 战队id=>name 映射
      processList: [], //赛事进程 process_list表所有数据
      boType: "1",
    };
    this.getTeamListOfOneMatch();
  }
  stateChange = (key,value) => {
    this.setState({
      [key]:value
    });
  };
  getTeamListOfOneMatch = () => {
    service.teamListOfOneMatch(this.state.matchId).then((res)=>{
      let nameList = [];
      for(let item of res.data){
        nameList[item.id] = item.name;
      }
      this.setState({
        teamList: res.data,
        nameList : nameList,
        boList: res.other.match_type,
        processList: res.other.process_list,
        boType: res.other.match_type[0].id,
      });
    })
  };
  handleMatchIdChange = (key, value) => {
    this.setState({
      [key]: value,
    },() => {
      this.getTeamListOfOneMatch();
    });

  };
  componentDidMount() {
    service.matchList().then((res)=>{
        this.stateChange('matchList', res.data);
      }
    );
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
  };

  render() {

    let Content;
    switch(this.props.location.pathname){
      case '/basicInput':
        Content = <BasicInput {...this.state} service={service}/>;
        break;
      case '/detailInput':
        Content = <DetailInput {...this.state} service={service}/>;
        break;
      case '/basicAnalyze':
        Content = <BasicAnalyze {...this.state} service={service}/>;
        break;
      default:
        break;
    }
    let config = [
      {
        label: '选择赛事',
        handleChange: this.handleMatchIdChange,
        value: this.state.matchId,
        options: this.state.matchList,
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
    ];
    return (
      <Row style={{ height: '100%',overflowY: "scroll"}}>
        <Col span={4} style={{ height: '100%' }}>
          <IndexComponent route={this.props.location.pathname} />
        </Col>
        <Col span={20} style={{height:'100%', overflowY: "scroll"}}>
          <Form layout="inline">
            {config.map((item,index)=>{
              return <FormItemDiy  key={item.keyName} {...item}/>
            })}
          </Form>
          {this.state.matchList.length ? Content : null}
        </Col>
      </Row>);
  }
}
InputData.propTypes = {};
InputData.defaultProps = {};
