'use strict'
class Transaction{
	constructor(publicKey,time,app,parameters){
		this.publicKey = publicKey
		this.time = time
		this.app = app
		this.parameters = parameters
	}
}
module.exports = Transaction