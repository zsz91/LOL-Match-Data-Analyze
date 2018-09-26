import request from '../utils/request';
const basicRoute = '/thinkphp' ;

export function query() {
  return request( basicRoute + '/api/users');
}

export function matchList() {
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=getMatchList`, {
    method: 'get',
  });
}

export function teamListOfOneMatch(matchId) {
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=getMatchTeamByMatchId&matchId=${matchId}`, {
    method: 'get',
  });
}

export function getListOfOneMatch(matchId,page){
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=getGameList&matchId=${matchId}&page=${page}`,{
    method: 'get',
  });
}

/*根据赛事id 和赛事阶段 返回胜负排名*/
export function getTeamRank(matchId,boType){
  return request(`${basicRoute}/index.php?m=Home&c=BasicAnalyze&a=getTeamRank&matchId=${matchId}&boType=${boType}`,{
    method: 'get',
  });
}

export function getGameListNoDetail(matchId,boType,page){
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=getGameListNoDetail&matchId=${matchId}&boType=${boType}&page=${page}`,{
    method: 'get',
  });
}

export function getGameDetail(matchId,boType,page){
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=getGameDetail&matchId=${matchId}&boType=${boType}&page=${page}`,{
    method: 'get',
  });
}

export function postGameList(data){
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=postGameList`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  });
}
export function postDetailData(data){
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=postDetailData`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  });
}

