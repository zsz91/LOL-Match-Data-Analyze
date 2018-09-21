/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import IndexComponent from './IndexComponent';
//import {Col, Row, Form, Button, message} from "antd";
//import FormItemDiy from '../../public/components/FormItemDiy';

/**
 *
 */
export default class BasicAnalyze  extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    };
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

  render() {
    let config = [
      {
        label: '选择赛事',
        handleChange: this.handleMatchIdChange,
        value: this.state.matchId,
        options: this.props.matchList,
        optionKey: 'id',
        optionName: 'name',
        type: 'SelectMultiple',
        keyName: 'matchId',
      },
    ];
    return (
      <div>
        <IndexComponent />
      </div>);
  }
}
BasicAnalyze.propTypes = {};
BasicAnalyze.defaultProps = {};
