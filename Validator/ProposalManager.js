'use strict'

var TransactionSets = require('../TransactionSets/TransactionSets')
var TransactionRunner = require('../DApps/TransactionRunner')

class ProposalManager{
	constructor(index,publicKey){
		this.index= index
		this.publicKey = publicKey
		this.transactionRunner = new TransactionRunner(index)
		this.TransactionSet = TransactionSets(index)
	}
	makeProposal(callback){
		console.log(this.index)
		var unusedTransactions = this.TransactionSet.getUnused()
		var transactionRunner = this.transactionRunner
		//init time before transaction do
		transactionRunner.initTime()
		//make Proposal
		var proposal = new Object()
		proposal.transactions = unusedTransactions
		proposal.publicKey = this.publicKey
		console.log(unusedTransactions)

		var promises = unusedTransactions.map(function(transaction){
			var transactionPromise = new Promise(function(resolve,reject){
				transactionRunner.run(transaction,function(done){
					if(done){
						console.log('done is true')
						resolve()
					}
					else{
						console.log('err')
						reject('transaction running fail')
					}
				})
			})
			console.log(transactionPromise)
			return transactionPromise
		})
		Promise.all(promises).then(function(){
			callback(proposal)
			/*
			transactionRunner.getOplogs(function(result){
				if(!result)
					console.log("can't get oplogs" )
				else{
					proposal.oplogs= result
					console.log('proposal is : ' +proposal)
					callback(proposal)
				}
			})*/
			
		}).catch(function(err){
			console.log('promise err is : ' + err)
			callback(false)
		})
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
}
module.exports = ProposalManager