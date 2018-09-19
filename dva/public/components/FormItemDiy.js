/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Select, Form, DatePicker} from "antd";
import {PropTypes} from 'prop-types';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

/**
 *
 */
export default class FormItemDiy  extends React.Component {

  switchType = () => {
    switch(this.props.type){
      case 'Select':
        return <Select style={{width:'150px'}}
                       onChange={(value)=>{this.props.handleChange(this.props.keyName, value)}}
                       value = {this.props.value}
                       key={this.props.keyName}
        >
          {this.props.options.map((item) => {
            return <Option value={item[this.props.optionKey]}
                           key={item[this.props.optionKey]}>
              {item[this.props.optionName]}
              </Option>
          })}
        </Select>;
      case 'DatePicker':
      return  <DatePicker value={this.props.value ? moment(this.props.value, dateFormat) : null }
                          format={'YYYY-MM-DD'}
                          key={this.props.keyName}
                          onChange={(date,dateString) => {this.props.handleChange(this.props.keyName,dateString)}}
              />;
      default:
        return false;

    }
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
  };



  render() {
    return (
      <FormItem
        label={this.props.label}>

        {this.switchType()}

      </FormItem>
    );
  }
}
FormItemDiy.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
};
FormItemDiy.defaultProps = {}
