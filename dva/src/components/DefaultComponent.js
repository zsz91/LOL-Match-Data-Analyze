/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import IndexComponent from './IndexComponent';

/**
 *
 */
export default class DefaultComponent  extends React.Component {
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
    return (
      <div>
        <IndexComponent />
      </div>);
  }
}
DefaultComponent.propTypes = {};
DefaultComponent.defaultProps = {};
