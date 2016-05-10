'use strict'
var sha256 = require('sha256')
var CommitManager = require('./CommitManager')
class VoteManager{
	constructor(index,publicKey){
		this.index = index
		this.publicKey = publicKey
		this.votes = []
	}
	makeVote(proposal,callback){
		var vote = new Object()
		vote.data = proposal
		vote.publicKey = this.publicKey
		callback(vote)
	}
	addVote(vote,callback){
		
		var proposalHash = sha256(vote.data.toString())
		if(typeof this.votes[proposalHash] == 'undefined' )
			this.votes[proposalHash] = []
		this.votes[proposalHash].push(vote)
		if(this.votes[proposalHash].length > 10){
			CommitManager.makeCommit(this.votes[proposalHash])
		}
		callback(this.votes[proposalHash])
	}
}
module.exports = VoteManager