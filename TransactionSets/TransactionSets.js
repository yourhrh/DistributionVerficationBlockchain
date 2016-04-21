'use strict'
var TransactionSet= require('./TransactionSet')
var ChainSetMaker = require('../Utills/ChainSetMaker')
var uniqueTransactionSets = undefined
function getTransactionSet(index){
	if(uniqueTransactionSets === undefined){
		uniqueTransactionSets = ChainSetMaker(TransactionSet)
		return uniqueTransactionSets[index]
	}
	else
		return uniqueTransactionSets[index]
}
module.exports = getTransactionSet