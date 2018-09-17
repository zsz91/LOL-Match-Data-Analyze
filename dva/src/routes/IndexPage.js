import React from 'react';
import { connect } from 'dva';
import IndexComponent from '../components/IndexComponent';
import 'antd/dist/antd.css';

 class IndexPage  extends React.Component {
   constructor(props){
        super(props);
        console.log(props);
   }
   render(){
     return (
       <div style={{ height: "100%" }}>
         <IndexComponent history={this.props.history} />
       </div>
     );
   }

 }


IndexPage.propTypes = {
};

export default connect()(IndexPage);
