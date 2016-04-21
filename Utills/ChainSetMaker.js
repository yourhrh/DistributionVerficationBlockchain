//블록체인의 라인수를 정하고 라인에 Dependent한 객체를 생성해주는 모듈
var range = require('../Utills/Range')
const CHAIN_NUM = 10
function MakeObjects(objConstructor){
	var objs = range(0,CHAIN_NUM).map(function(value){
		return new objConstructor(value)
	})
	console.log(objs)
	return objs
}


module.exports = MakeObjects