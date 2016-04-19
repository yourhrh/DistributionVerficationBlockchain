'use strict'
var DB_ADDRESS = 'mongodb://localhost/Blockchain'
var mongojs = require('mongojs')
class BlockController{
	constructor(index){
		var db = mongojs(DB_ADDRESS)
		this.collection = db.collection('chain'+index)
	}
	makeBlock(BlockData,callback){
		var bc = this
		this.getLastBlock(function(result){
			console.log('makeBlock')
			var condition
			if(result){
				condition = BlockData.height == result.height +1
			}
			else
				condition  = BlockData.height == 0
			if(condition)
				bc.collection.insert(BlockData,function(err,result){
					if(err){
						console.log('insert err : ' + err)
						callback(false)
					}
					callback(result)
				})
			else{
				console.log('blockchain already have same height')
				callback(false)
			}

		})
	}
	getLastBlock(callback){
		this.collection.find().sort({height :  1}, function (err, doc) {
			if (err){
				console.log('find last block err : ' + err)
				callback(false)
			}
			callback(doc[0]);
		})
	}
	getBlock(height,callback){
	        	this.collection.findOne({height : height}, function (err, doc) {
		          	if (err){
		          		console.log('find last block err : ' + err)
		          		callback(false)
		         	}
	      	callback(doc);
	    	})
	}
}
function connectDbCollection(collectionName,callback){
	mongoClient.connect(DB_ADDRESS,function(err,db){
		if(err){
			console.log('db connect err : ' + err)
			callback(false) 
		}
		else
			db.collection(collectionName,function(err,collection){
				if(err){
					console.log('get collection Err  : ' + err)
					db.createCollection(collectionName,null,function(err,collection){
						callback(collection)
					})
				}
				else{
					callback(collection)
				}
			})
	})
}
module.exports = BlockController