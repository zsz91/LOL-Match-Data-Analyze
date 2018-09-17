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
/**
 *
 */
export default class InputData  extends React.Component {
  componentDidMount() {
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
  };

  render() {
    let Content = <BasicInput/>;
    switch(this.props.location.pathname){
      case '/basicInput':
        Content = <BasicInput/>;
        break;
      case '/detailInput':
        Content = <DetailInput/>;
        break;
      default:
        break;
    }
    return (
      <Row style={{ height: '100%' }}>
        <Col span={4} style={{ height: '100%' }}>
          <IndexComponent route={this.props.location.pathname} />
        </Col>
        <Col span={20}>
          {Content}
        </Col>
      </Row>);
  }
}
InputData.propTypes = {};
InputData.defaultProps = {};
