'use strict'

var TransactionSets = require('../TransactionSets/TransactionSets')
var TransactionRunner = require('../DApps/TransactionRunner')
class ProposalMaker{
	constructor(index,publicKey){
		this.index = index
		this.publicKey = publicKey
	}
	makeProposal(callback){
		console.log(this.index)
		var transactionSet = TransactionSets(this.index)
		var unusedTransactions = transactionSet.getUnused()
		var transactionRunner = new TransactionRunner(this.index)
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
}
module.exports = ProposalMaker