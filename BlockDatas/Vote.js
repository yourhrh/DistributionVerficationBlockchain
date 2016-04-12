class Vote {
	constructor(publicKey,chainNum,height,proposalHash){
		this.type = 'Vote'
		this.publicKey = publicKey
		this.chainNum = chainNum
		this.height = height
		this.proposalHash = proposalHash
	}

}

module.exports = Vote
