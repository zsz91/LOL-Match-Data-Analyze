/*
 * @Author: 钟是志
 * @Date: 2018-09-17
 *
 */
import React from 'react';
import { Row, Form, Button} from "antd";
import FormItemDiy from '../../public/components/FormItemDiy';

/**
 *
 */
export default class BasicAnalyze  extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      teamList: [],
      oneTeamDetail:[],
      typeTrend:null,
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
  handleMatchIdChange = (key, value) => {
    this.setState({
      [key]: value,
    },() => {
      this.getTeamListOfOneMatch();
    });

  };
  getTeamRank = () => {
    this.props.service.getTeamRank(this.props.matchId, this.props.boType).then((res)=>{
        let teamList = this.props.teamList;
        let data = res.data;

        let length = teamList.length;
        /*排序*/
        for(let i = 0; i < length; i++){
          let item = teamList[i];
          if(typeof data[item['id']] !== 'undefined'){
            item['win'] = data[item['id']]['win'] || 0;
            item['lose'] = data[item['id']]['lose'] || 0;
          }else{
            item['win'] = -1;
            item['lose'] = -1;
          }
        }
        teamList.sort(function(a,b){
          if(a.win > b.win){  //当a 的editable 为true 时 a 排在b 前面
            return -1;
          }else if(a.win === b.win && a.lose < b.lose){
            return -1;
          }else{
            return 1;
          }
        });
      this.stateChange('teamList',teamList);
      this.stateChange('typeTrend',res.other);
    });
  };
  getOneTeamGameDetail = (item) => {
    this.props.service.getOneTeamGameDetail(this.props.matchId, this.props.boType, item.id).then((res)=>{
      for(let data of res.data){
       let names =  this.giveName(['blue', 'red', 'first_blood', 'five_kill'], data);
       Object.assign(data,data,names);
      }
      this.stateChange('oneTeamDetail',res.data);
    })
  };

  giveName = (keys = [],data) =>{
    let res = {};
    for(let item of keys){
      res[item] = this.props.nameList[data[item]];
    }
    return res;
  };

  render() {
    return (
      <div>
        <Button onClick={()=>{this.getTeamRank()}}>提交</Button>
        <Row>
          排名
        </Row>
        {this.state.teamList.length?
          this.state.teamList.map((item,index)=>{
            if((item.lose <= 0 && item.win <=0) || typeof item.win === 'undefined'){
              return null;
            }
          return <Row key={item.id}
                      onClick ={()=>{this.getOneTeamGameDetail(item)}}
          >
                      {index+1}-{item.name}:{item.win + ""}-{item.lose + ""}
                      </Row>})
          : null}
        {this.state.oneTeamDetail.map((item)=>{
         return <Row key={item.id}>{JSON.stringify(item)}</Row>
        })}
        {!!this.state.typeTrend && this.state.typeTrend.percent ?
          <Row key={this.props.boType}>
            {JSON.stringify(this.state.typeTrend.percent)}
          </Row> : null}
        {!!this.state.typeTrend && this.state.typeTrend.trend ? this.state.typeTrend.trend.map(
          (item)=>{ return <Row key={item.id}>{JSON.stringify(item)}</Row>}) : null}


      </div>);
  }
}
BasicAnalyze.propTypes = {};
BasicAnalyze.defaultProps = {};
