//블록체인의 라인수를 정하고 라인에 Dependent한 객체를 생성해주는 모듈
const CHAIN_NUM = 10
function MakeObjects(objConstructor){
	var objs = []
	for(var i=0;i<CHAIN_NUM;i++){
		(function(j){
			objs.push(objConstructor(j))
		})(i)
	}
	return objs
}


module.exports = MakeObjects