/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Col, Row, Select, Form, DatePicker} from "antd";
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';
/**
 *
 */
export default class BasicInput  extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      matchId: "1",
      teamList: [],
      teamA: '1',
      teamB: '2',
      gameDate:null,
      boList: [],
      boType: '1',
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

  getTeamListOfOneMatch = () => {
    this.props.service.teamListOfOneMatch(this.state.matchId).then((res)=>{
      this.setState({
        teamList: res.data,
        boList: res.other,
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

  render() {
    return (
      <Row>
        <Col span={24}><h2>一场比赛的基本数据录入</h2></Col>
        <Row>
          <Form layout="inline">
            <FormItem
              label="选择赛事"
            >
              <Select style={{width:'100%'}}
                      onChange={(value)=>{this.handleMatchIdChange('matchId', value)}}
                      value = {this.state.matchId}
              >
                {this.props.matchList.map((item) => {
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })}
              </Select>
            </FormItem>
            <FormItem
              label="对战日期"
            >
              <DatePicker
                value={this.state.gameDate ? moment(this.state.gameDate, dateFormat) : null }
                format={'YYYY-MM-DD'}
                onChange = {(date,dateString) => {this.stateChange('gameDate',dateString)}}
              />
            </FormItem>
            <FormItem
              label="选择战队A"
            >
              <Select style={{width:'120px'}}
                      onChange={(value)=>{this.stateChange('teamA', value)}}
                      value = {this.state.teamA}
              >
                {this.state.teamList.map((item) => {
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })}
              </Select>
            </FormItem>
            <FormItem
              label="选择战队B"
            >
              <Select style={{width:'120px'}}
                      onChange={(value)=>{this.stateChange('teamB', value)}}
                      value = {this.state.teamB}
              >
                {this.state.teamList.map((item) => {
                  return <Option value={item.id} key={item.id}>{item.name}</Option>
                })}
              </Select>
            </FormItem>
            <FormItem
              label="BO_TYPE"
            >
              <Select style={{width:'120px'}}
                      onChange={(value)=>{this.stateChange('boType', value)}}
                      value = {this.state.boType}
              >
                {this.state.boList.map((item) => {
                  return <Option value={item.id}
                                 key={item.id}>
                            {item.name}
                          </Option>
                })}
              </Select>
            </FormItem>
          </Form>
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
