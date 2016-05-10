var PermissionValidator = require('../Validator/PermissionValidator')
var BlockController = require('../Validator/BlockController')
var keySet = require('coinKey').createRandom()
var Translator = require('../Utills/Translator')
var expect = require('chai').expect
var ProposalMaker = require('../Validator/ProposalMaker')
var TransactionSets = require('../TransactionSets/TransactionSets')
var Transaction = require('../TransactionSets/Transaction')
var Validator = require('../Validator/Validator')
var Range = require('../Utills/Range')
var translator = require('../Utills/Translator')
var VoteManager = require('../Validator/VoteManager')
var CommitManager = require('../Validator/CommitManager')
var ProposalManager = require('../Validator/ProposalManager')

describe('Validators Test\n', function() {
	var sharedProposal 
	var sharedVote
	it('BlockController can make Block & can get That \n ', function(done){
		var blockController = new BlockController(0)
		var translator = new Translator()
		var BlockData = new Object()
		BlockData.proposal= 'genesis Block'
		BlockData.prevote  = 'genesis Block'
		BlockData.vote = 'genesis Block'
		BlockData.publicKey = keySet.privateKey
		BlockData.height = 0
		translator.objToMsg(BlockData,keySet.publicKey,function(result){
			BlockData.ballot = result
			//makeBlock(BlockData,callback(err))
			blockController.makeBlock(BlockData,function(result){
				// height , result 
				blockController.getBlock(0,function(result){
					expect(result.proposal).to.equal('genesis Block')
					expect(result.prevote).to.equal('genesis Block')
					expect(result.vote).to.equal('genesis Block')
					//expect(result.ballot.publicKey).to.equal('genesis Block')
					expect(result.height).to.equal(0)
					//result
					blockController.getLastBlock(function(result){
						expect(result.proposal).to.equal('genesis Block')
						expect(result.prevote).to.equal('genesis Block')
						expect(result.vote).to.equal('genesis Block')
						//expect(result.ballot.publicKey).to.equal('genesis Block')
						expect(result.height).to.equal(0)
						done()
					})
				})
			})
		})
	})
	it('permission validate must do correct \n', function(done) {
		var validator = new PermissionValidator(new BlockController(0))
		done()
	})
	it('can make Proposal & validate that is true', function(done) {
		var transactionSet = TransactionSets(0)
		var proposalManager = new ProposalManager(0,keySet)
		var transactions = Range(0,10).map(function(value){
			return new Transaction(keySet.publicKey,'insert',value)
		})
		transactionSet.addAll(transactions)
		
		proposalManager.makeProposal(function(proposal){
			sharedProposal = proposal
			expect(proposal.transactions.length).to.equal(10)
			proposalManager.validateProposal(proposal,function(result){
				expect(result).to.equal(true)
				done()
			})
		})
	});
	it('Make Vote & Can Count That',function(done){

		var voteManager = new VoteManager(0,keySet)
		voteManager.makeVote(proposal,function(vote){
			VoteManager.addVote(vote,function(votes){
				var sharedVote = votes
				expect(1).to.equal(votes.length)
				expect(vote).to.equal(votes[0])
			})
		})


	})
	it('can Make Commit & ', function(done) {
		var commitManager = new CommitManager(0,keySet)
		commitManager.makeCommit(sharedProposal,sharedVote,function(commit){
			expect(commit.votes).to.equal(vote)
			expect(commit.proposal).to.equal(proposal)
			commitManager.validatorCommit(commit,function(result){
				expect(result).not.to.equal(false)
			})
		})
	});

})  	