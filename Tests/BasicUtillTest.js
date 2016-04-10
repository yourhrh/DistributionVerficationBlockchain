'use strict'
var expect = require('chai').expect
var Translator = require('../Utills/Translator')
var coinKey = require('coinKey')

var keySet = coinKey.createRandom()

describe('Translator Test', function() {
	it('Transaction Translate ', function(done) {
		var translator = new Translator()
		//parameters
		var Transaction = require('../TransactionSets/Transaction')
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


	
})