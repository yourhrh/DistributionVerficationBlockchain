'use strict'
var expect = require('chai').expect
var Translator = require('../Utills/Translator')
var coinKey = require('coinKey')
var Oplogger = require('../Utills/Oplogger')
var range = require('../Utills/Range')
var keySet = coinKey.createRandom()
var TransactionRunner = require('../DApps/TransactionRunner')
var Transaction = require('../TransactionSets/Transaction')
var Oplogger = require('../DApps/AppDBContoller')

describe('Translator Test\n', function() {
	var startTime,endTime
	it('Obj can translate Msg and Must recovery Obj\n ', function(done) {
		var translator = new Translator()
		//parameters
		
		//거꾸로 해야 ecdh모듈에서 인식한다 
		var publicKey = keySet.privateKey
		var privateKey = keySet.publicKey
		var time = Math.floor(new Date().getTime() / 1000)
		var app = 'insert'
		var parameters = 22

		//트랜잭션 을 Msg로 바꾼것과 다시 복구해서 바꾼것이 같으면 같다고 가정 
		var testTransaction = new Transaction(publicKey,time,app,parameters)

		translator.objToMsg(testTransaction,privateKey,function(transactionMsg){
			//transactionMSg
			translator.msgToObj(transactionMsg,function(recoveryObj){
				//msg to Obj

				expect('insert').to.equal(recoveryObj.app)
				expect(22).to.equal(recoveryObj.parameters)
				expect(time).to.equal(recoveryObj.time)
				done()
			})
		}) 
	})
	it('TransactionRunner Must do all Transactions \n', function(done) {
		var transactionRunner = new TransactionRunner(0)
		var transactions = range(0,10).map(function(insertNum){
			return new Transaction(keySet.publicKey,Math.floor(new Date().getTime() / 1000),
				'insert',insertNum)
		})
		//시간 초기화 
		transactionRunner.initTIme()
		//트랜잭션 실행 
		var transactionResults = transactions.map(function(transaction){
			var transactionResult = null
			transactionRunner.run(transaction,function(result){
				console.log('callback do : '+result)
				transactionResult = result
			})
			return transactionResult
		})
		transactionRunner.getTIme(function(start,end){
			startTIme = start
			endTime = end
			expect(transactionResults).to.deep.equal([true,true,true,true,true,true,true,true,true,true])
			done()
		})
	});
	it('AppDB do correct & make oplog ', function(done) {
		
	});

	
})