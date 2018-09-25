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
    this.state={
      matchId: "1", // 赛事id
      boList: [], // 赛事阶段列表.
      boType: "1", // 赛事阶段id.
      teamList:[],
      processList:[],
    };
    this.getTeamListOfOneMatch();
  }

  stateChange = (key,value) => {
    this.setState({
      [key]:value
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
  getGameListNoDetail = () => {

  };
  componentDidMount() {
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
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
        <Button onClick={()=>{this.getGameList()}}>
          提交
        </Button>
        <Row>

        </Row>



      </div>);
  }
}
DetailInput.propTypes = {};
DetailInput.defaultProps = {};
