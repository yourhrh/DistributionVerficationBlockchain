'use strict'
var TransactionRunner = require('../DApps/TransactionRunner')
class Validator{
	construtor(chainNum){
		this.chainNum = chainNum
	}
	validateProposal(proposal,callback){
		var transactionRunner = new TransactionRunner(this.chainNum)
		//transactionRunner.initTime()
		proposal.transactions
		transactionRunner.runAll(proposal.transactions,function(done){
			if(done){
				callback(true)
				/* todo make complete
				transactionRunner.getOplogs(function(oplogs){
					compareOplogs(oplogs,proposal.oplogs,function(compare){
						callback(compare)
					})
				})
				*/

			}
		})
	}
	validatePrevote(){

	}
	validateVote(){

	}
}
//todo if make complete
/*
function compareOplogs(oplogs,compartors,callback){
	promises = oplogs.map(function (value){
		return compareOplog(value,)
	})
}
function compareOplog(oplog,compator){
	return new Promise(function(resolve,reject){
		var compareValue = Object.keys(oplog).reduce(function (previous,value){
			if(value != 'time'){
				if(oplog[value] === compartor[value])
					return previous+= 0
				else
					return previous+= 1
			}
		})
		if(compareValue == 0)
			resolve()
		else
			reject('different property num is : ' + compareValue)
	})
}
*/ 


module.exports =  Validator