/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Col, Row} from "antd";
import IndexComponent from "./IndexComponent";
import BasicInput from './BasicInput';
import DetailInput from './DetailInput';
import * as service from '../services/example';

/**
 *
 */
export default class InputData  extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      matchList:[],
    };
  }


  componentDidMount() {
    service.matchList().then((res)=>{
        this.setState({
          matchList:res.data,
        });
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
      default:
        break;
    }
    return (
      <Row style={{ height: '100%' }}>
        <Col span={4} style={{ height: '100%' }}>
          <IndexComponent route={this.props.location.pathname} />
        </Col>
        <Col span={20} style={{height:'100%'}}>
          {this.state.matchList.length ? Content : null}
        </Col>
      </Row>);
  }
}
InputData.propTypes = {};
InputData.defaultProps = {};
