'use strict'
class Transaction{
	constructor(publicKey,app,parameters){
		this.type = 'Transaction'
		this.publicKey = publicKey
		this.time = Math.floor(new Date().getTime() / 1000)
		this.app = app
		this.parameters = parameters
	}
}
module.exports = Transaction