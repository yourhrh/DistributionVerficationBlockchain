class Prevote{
	constructor(publicKey,chainNum,height,proposalHash){
		this.type = 'Prevote'
		this.publicKey = publicKey
		this.chainNum = chainNum
		this.height = height
		this.proposalHash  = proposalHash
	}
}

module.exports = Prevote