/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

const SubMenu = Menu.SubMenu;
/**
 *
 */
export default class IndexComponent  extends React.Component {

  componentDidMount() {
  };

  shouldComponentUpdate(nextProps,nextState){
    return true;
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        defaultSelectedKeys={['/basicInput']}
        selectedKeys={[this.props.route]}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        style={{ height: "100%" }}
      >
        <SubMenu key="sub1"
                 title={
                   <span>
                     <Icon type="mail" />
                   <span>
                     数据录入
                   </span>
                 </span>}
        >
          <Menu.Item key="/basicInput">
            <Link to="/basicInput">
              录入基本
            </Link>
          </Menu.Item>
          <Menu.Item key="/detailInput">
            <Link to="/detailInput">
              录入详情
            </Link>
          </Menu.Item>
          <Menu.Item key="/addMatch">
            <Link to="/addMatch">
              编辑赛事
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2"
                 title={<span>
                   <Icon type="mail" />
                   <span>
                     数据查询
                   </span>
                 </span>}
        >
          <Menu.Item key="/basicAnalyze">
            <Link to="/basicAnalyze">
              基本
            </Link>
          </Menu.Item>
        </SubMenu>

      </Menu>
    );
  }
}
IndexComponent.propTypes = {};
IndexComponent.defaultProps = {};
