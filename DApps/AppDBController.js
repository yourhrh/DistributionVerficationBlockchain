'use strict'
var mongoClient = require('mongodb').MongoClient
var DbName =  'mongodb://localhost/Dapp'
function connectDbCollection(collectionName,callback){
	mongoClient.connect(DbName,function(err,db){
			if(err){
				console.log('db connect err : ' + err)
				callback(false)

			}
			else
				db.collection(collectionName,function(err,collection){
					if(err){
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
class AppDBController{
	constructor(index){
		this.index = index
		this.oplogs = []
	}
	emit(dbOperation,callback){
		var oplogs = this.oplogs
		this[dbOperation.type](dbOperation,function(result){
			if(!result)
				callback(false)
			else{
				oplogs.push({time : Math.floor(new Date().getTime() / 1000), oplog : dbOperation})

				callback(result)
			}
		})

	}
	get(app,query,callback){
		connectDbCollection(app,function(collection){
			if(collection){
				collection.find(query).toArray(function(err,docs){
					if(err){
						console.log('find to Array err : '  + err)
						callback(false)
					}
					else{
						console.log(docs)
						callback(docs)
					}
				})
			}
		})
	}
	put(dbOperation,callback){
		connectDbCollection(dbOperation.app,function(collection){
			if(collection){
				collection.insertMany(dbOperation.data,function(err,result){
					if(err){
						console.log('insert Err : ' + err)
						callback(false)
					}
					else
						callback(result)

				})
			}
			else
				callback(false)
		})
			
	}

	set(dbOperation,callback){
		connectDbCollection(dbOperation.app,function(collection){
			if(collection){
				collection.updateMany(dbOperation.query,dbOperation.data,dbOperation.options,function(err,doc){
					if(err){
						console.log('set err : ' + err)
						callback(false)
					}
					else{
						callback(doc)
					}
				})
			}
		})


	}
	del(dbOperation,callback){
		connectDbCollection(dbOperation.app,function(collection){
			if(collection){
				collection.deleteMany(dbOperation.filter,dbOperation.options,function(err,doc){
					if(err){
						console.log('delete err : ' + err)
						callback(false)
					}
					else
						callback(doc)

				})
			
			}
		})

	}
	getOplogs(start,end,callback){
		var result = this.oplogs.filter(function(value){
			console.log('times : ' + start ,' ', end , ' ', value.time)
			return end-start >= end-value.time
		})
		console.log('result : ' +result)
		callback(result)
	}

}
module.exports = AppDBController