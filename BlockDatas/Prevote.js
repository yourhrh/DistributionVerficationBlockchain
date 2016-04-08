class Prevote{
	constructor(publicKey,chainNum,height,proposalHash){
		this.publicKey = publicKey
		this.chainNum = chainNum
		this.height = height
		this.proposalHash  = proposalHash
	}
}

module.exports = Prevote