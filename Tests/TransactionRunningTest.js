'use strict'
var expect = require('chai').expect
var Translator = require('../Utills/Translator')
var coinKey = require('coinKey')
var Oplogger = require('../Utills/Oplogger')
var range = require('../Utills/Range')
var keySet = coinKey.createRandom()
var TransactionRunner = require('../DApps/TransactionRunner')
var Transaction = require('../TransactionSets/Transaction')
var AppDBController = require('../DApps/AppDBController')
var globalOplogs
describe('Transaction Running Test\n', function() {
	it('Obj can translate Msg and Must recovery Obj\n ', function(done) {
		var translator = new Translator()
		//parameters

		
		//거꾸로 해야 ecdh모듈에서 인식한다 
		var publicKey = keySet.privateKey
		var privateKey = keySet.publicKey
		var app = 'insert'
		var parameters = 22

		//트랜잭션 을 Msg로 바꾼것과 다시 복구해서 바꾼것이 같으면 같다고 가정 
		var testTransaction = new Transaction(publicKey,app,parameters)

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
			return new Transaction(keySet.publicKey,
				'insert',insertNum)
		})
		//시간 초기화 
		transactionRunner.initTime()
		//트랜잭션 실행 
		var transactionResults = transactions.map(function(transaction){
			var transactionResult = null
			transactionRunner.run(transaction,function(result){
				transactionResult = result
			})
			return transactionResult
		})
		transactionRunner.getTime(function(start,end){
			expect(transactionResults).to.deep.equal([true,true,true,true,true,true,true,true,true,true])
			done()
		})
	});
	it('AppDB do correct & make oplog \n', function(done) {
		initMongoClient()
		var dbController = new AppDBController(0)
		var start = Math.floor(new Date().getTime() / 1000)
		dbController.emit({'type' : 'put','app' : 'test','data' : [{inputData : 1}]},function(result){
			
			expect(result).to.not.equal(false)
			dbController.get('test',{inputData : 1},function( data){
				expect(data[0]).to.contain({inputData : 1})
				dbController.emit({'type' : 'set','app' : 'test','query' : {inputData : 1},'data' : {$set : {inputData : 3}}},function(result){
					expect(result).to.not.equal(false)
					dbController.get('test',{inputData : 3},function( data){
						console.log('data : ' + data)
						expect(data[0]).to.contain({inputData : 3})

						dbController.getOplogs(start,Math.floor(new Date().getTime() / 1000),function(oplogs){
							console.log(oplogs)
							globalOplogs = oplogs
							expect(2).to.equal(oplogs.length)
							//expect(oplogs[0].oplog).to.equal({type : 'put',app: 'test',data:
								//[{inputData : 1}]})
							//expect(oplogs[1].oplog).to.equal({type : 'set',app: 
								//'test', query:{inputData : 1}, data : [{inputData : 3}]})
							done()

						})
					})
				})
					

			})	
		})
		
	});
	it('oplog must can recover\n', function(done) {
		initMongoClient()
		var obj = new Object()
		var dbController = new AppDBController(0)
		obj.publicKey = keySet.privateKey
		obj.oplogs = globalOplogs
		var translator = new Translator()
		translator.objToMsg(obj,keySet.publicKey,function(transactionMsg){
			console.log(transactionMsg)
			translator.msgToObj(transactionMsg,function(recovery){
				console.log(recovery)
				done()
			})
		})
		
	});

	
})


function initMongoClient(callback){
    var mongoClient = require('mongodb').MongoClient;
    mongoClient.connect('mongodb://localhost/BlockchainApplicationDatabase', function (err, db){
        db.collection('plus', function (err, collection) {
            collection.remove({}, function (err, doc) {
            });
        });
        
        
    })
};