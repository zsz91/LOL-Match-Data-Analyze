/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Col, Row, Form, Button, message} from "antd";
import FormItemDiy from '../../public/components/FormItemDiy';
import {teamListOfOneMatch} from "../services/basicApi";

/**
 *
 */
export default class BasicAnalyze  extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      matchId: "1", // 赛事id
      boList: [], // 赛事阶段列表.
      boType: "1", // 赛事阶段id.
      teamList:[],
      processList:[],
    };
    this.getTeamListOfOneMatch();
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
  handleMatchIdChange = (key, value) => {
    this.setState({
      [key]: value,
    },() => {
      this.getTeamListOfOneMatch();
    });

  };
  getTeamListOfOneMatch = () => {
    this.props.service.teamListOfOneMatch(this.state.matchId).then((res)=>{
      this.setState({
        teamList: res.data,
        boList: res.other.match_type,
        processList: res.other.process_list,
        boType: res.other.match_type[0].id,
      });
    })
  };

  getTeamRank = () => {
    this.props.service.getTeamRank(this.state.matchId, this.state.boType).then((res)=>{
        let teamList = this.state.teamList;
        let data = res.data;
        let length = teamList.length;
        for(let i = 0; i < length; i++){
          let item = teamList[i];
          if(typeof data[item['id']] !== 'undefined'){
            item['win'] = data[item['id']]['win'] || 0;
            item['lose'] = data[item['id']]['lose'] || 0;
          }else{
            item['win'] = -1;
            item['lose'] = -1
          }
        }
        teamList.sort(function(a,b){
          if(a.win > b.win){  //当a 的editable 为true 时 a 排在b 前面
            return -1;
          }else if(a.win === b.win && a.lose < b.lose){
            return -1;
          }else{
            return 1;
          }
        });
        console.log(teamList);
        this.stateChange('teamList',teamList);
    });
  };


  render() {
    let config = [
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
    ];
    return (
      <div>
        <Form layout="inline">
          {config.map((item,index)=>{
            return <FormItemDiy  key={item.keyName} {...item}/>
          })}
        </Form>
        <Button onClick={()=>{this.getTeamRank()}}>提交</Button>
        <Row>
          排名
        </Row>
        {this.state.teamList.length?
          this.state.teamList.map((item,index)=>{
            if((item.lose <= 0 && item.win <=0) || typeof item.win === 'undefined'){
              return null;
            }
          return <Row key={item.id}>{index+1}-{item.name}:{item.win + ""}-{item.lose + ""}</Row>})
          : null}


      </div>);
  }
}
BasicAnalyze.propTypes = {};
BasicAnalyze.defaultProps = {};
