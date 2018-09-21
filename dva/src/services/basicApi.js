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

export function postGameList(data){
  return request(`${basicRoute}/index.php?m=Home&c=Index&a=postGameList`, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  });
}
