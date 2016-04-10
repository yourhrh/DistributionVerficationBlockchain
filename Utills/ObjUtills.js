'use strict'
var serializer = require('deserializable')
var ecdh = require('ecdh-es')
class ObjUtills{
	constructor(){

	}
	serialize(obj){
		return serializer.stringify(obj)
	}
	deserialize(serialized){
		return serializer.parse(serialized)	
	}
	encrypt(msg,privateKey){
		return ecdh.encrypt(privateKey,msg)
	}
	decrypt(encrypted,publicKey){
		return ecdh.decrypt(publicKey,encrypted)
	}

}
module.exports = new ObjUtills()