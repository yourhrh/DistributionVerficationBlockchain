class Proposal {
	constructor(publicKey,chainNum,height,oplogs){
		this.type = 'Proposal'
		this.publicKey = publicKey
		this.chainNum = chainNum
		this.height = height
		this.oplogs = oplogs
	}
}