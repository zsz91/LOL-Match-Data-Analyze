/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import {Select, Form, DatePicker, TimePicker, Input} from "antd";
import {PropTypes} from 'prop-types';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD';

/**
 *
 */
export default class FormItemDiy  extends React.Component {

   range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

   disabledHours = () => {
    const hours = this.range(0, 60);
    hours.splice(0, 2); //删掉 0 1 让0,1可以使用
    // 返回 的时间都是不能使用的
    return hours;
    };
    disableSeconds = () => {
     let seconds = [];
     for(let i = 0; i < 60; i++){
      if( i%20 !== 0 ){
        seconds.push(i);
      }
    }
    return seconds;
   };

  switchType = () => {
    switch(this.props.type){
      case 'Input':
        return <Input style={{width:'150px'}}
                      onChange={(e)=>{this.props.handleChange(this.props.keyName, e.target.value)}}
                      value = {this.props.value}
                      key={this.props.keyName}
        />;
        break;
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
      case 'TimePicker':
        return <TimePicker onChange={(time,timeString)=>{ this.props.handleChange(this.props.keyName,timeString) }}
                           value={moment(this.props.value, 'mm:ss')}
                           format="mm:ss"
                       //    disabledHours={this.disabledHours}
                           hideDisabledOptions
                        //   disabledSeconds={this.disableSeconds}
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
