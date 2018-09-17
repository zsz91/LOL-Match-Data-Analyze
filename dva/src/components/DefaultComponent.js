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
  }

  componentDidMount() {
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
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
