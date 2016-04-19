var PermissionValidator = require('../Validator/PermissionValidator')
var BlockController = require('../Validator/BlockController')
var keySet = require('coinKey').createRandom()
var Translator = require('../Utills/Translator')
var expect = require('chai').expect
var ProposalMaker = require('../Validator/ProposalMaker')
var TransactionSets = require('../TransactionSets/TransactionSets')
var Validator = require('../Validator/Validator')
describe('Validators Test\n', function() {

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
		var transactionSet = TrasnactionSets.get(0)
		var validator = new Validator(0)
		for(var i=0;i<10;i++){
			function(j){
				transactionSet.add(new Transaction(keySet.publicKey,'insert',j))
			}(i)
		}
		var proposalMaker = new ProposalMaker()
		proposalMaker.makeProposal(function(proposal){
			validator.validateProposal(proposal,function(result){
				expect(result).to.not.equal(false)
				
			})
		})
	});
})  