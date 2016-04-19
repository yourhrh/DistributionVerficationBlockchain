'use strict'
var randomGenerator = require('random-js').engines.mt19937();
var sha256 = require('sha256');

class PermissionValidator{
	constructor(BlockController){
		this.BlockController = BlockController
	}
	validate(publicKey,callback){
		this.BlockController.getLastBlock(function(result){
			var previousHash = sha256(result)
			var randNum = randomGenerator.seed(previousHash + myId)();
           		randNum = sha256(randNum); 
           		var randNum2 = sha256(previousHash + myId);
           		randNum = randNum.charAt(26);
            		randNum2 = randNum2.charAt(26);
            		if(randNum=== randNum2)
            			callback(true)
            		else 
            			callback(false)
		})
	}
}

module.exports = permissionValidate