'use strict'
var AppDBController = require('./AppDBController')
class TransactionRunner{
	constructor(index){
		this.index = index
		this.dbContoller= new AppDBController(index)
	}
	timeInit(){
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
	getTime(callback){
		this.end = Math.floor(new Date().getTime() / 1000)
		callback(this.start,this.end,function(){
			timeInit()
		})
	}
}

module.exports = TransactionRunner