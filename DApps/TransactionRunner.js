'use strict'
var AppDBController = require('./AppDBController')
class TransactionRunner{
	constructor(index){
		this.index = index
		this.dbContoller= new AppDBController(index)
	}
	initTime(){
		this.start = Math.floor(new Date().getTime() / 1000)
		this.end = Math.floor(new Date().getTime() / 1000)
	}
	run(transaction,callback){
		console.log(transaction.app)
		var app = require('./'+transaction.app)

		app(transaction.publicKey,transaction.parameter,this.dbContoller,function(done){
			callback(done)
		})
	}
	runAll(transactions,callback){
		var transactionRunner = this
		var promises = transactions.map(function(transaction){
			return new Promise(function(resolve,reject){
				transactionRunner.run(transaction,function(done){
					if(done)
						resolve()
					else
						reject('do transaction fail : ' + done)
				})
			})
		})
		Promise.all(promises).then(function(){
			callback(true)
		}).catch(function(errMsg){
			console.log(errMsg)
			callback(false)
		})
	}
	getTime(callback){
		this.end = Math.floor(new Date().getTime() / 1000)
		callback(this.start,this.end)
		this.initTime()
	}
	getOplogs(callback){
		var dbContoller = this.dbContoller
		this.getTime(function(startTime,endTime){
			dbContoller.getOplogs(startTime,endTime,function(oplogs){
				callback(oplogs)
			})
		})
	}
}

module.exports = TransactionRunner