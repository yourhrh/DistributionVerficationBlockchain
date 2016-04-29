'use strict'
var TransactionRunner = require('../DApps/TransactionRunner')
var ProposalMaker  = require('./ProposalMaker')
class Validator{
	constructor(chainNum,publicKey){
		console.log('construtor')
		this.publicKey = publicKey
		this.chainNum = chainNum
		this.transactionRunner = new TransactionRunner(this.chainNum)
		this.proposalMaker = new ProposalMaker(this.chainNum,this.publicKey,this.transactionRunner)
		console.log('validator : ' + this.publicKey + this.chainNum+ this.transactionRunner+ this.proposalMaker)
	}
	validateProposal(proposal,callback){
		//transactionRunner.initTime()
		this.transactionRunner.runAll(proposal.transactions,function(done){
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