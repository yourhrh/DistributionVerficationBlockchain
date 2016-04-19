'use strict'
var ObjUtills = require('./ObjUtills')

function objPublicKeytoJson(obj,callback){
	var publicKey = JSON.stringify(obj.publicKey)
	callback(publicKey)
}

class Translator{
	constructor(){
		
	}

	objToMsg(obj,privateKey,callback){

		objPublicKeytoJson(obj,function(publicKey){
			var publicKey = publicKey
			delete obj.publicKey

			var msg = ObjUtills.serialize(obj)
			var encryptedMsg = ObjUtills.encrypt(msg,privateKey)

			// 반환 오브젝트 
			var completeMsg = new Object()
			completeMsg.publicKey = publicKey
			console.log('public Key :' + publicKey)
			completeMsg.encryptedMsg = JSON.stringify(encryptedMsg)
			console.log('completeMsg : '+ JSON.stringify(completeMsg))

			callback(completeMsg)
		})
	}

	msgToObj(msg,callback){
		//string to bufferOBj 
		var publicKey = new Buffer(JSON.parse(msg.publicKey))
		var encryptedMsg = new Buffer(JSON.parse(msg.encryptedMsg))
		
		var decryptedMsg = ObjUtills.decrypt(encryptedMsg,publicKey)
		var unserializeObj = ObjUtills.deserialize(decryptedMsg);
		unserializeObj.publicKey  = publicKey
		callback(unserializeObj)
	}
}
module.exports = Translator