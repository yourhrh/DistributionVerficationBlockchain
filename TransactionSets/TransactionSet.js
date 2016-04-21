'use strict'

var deepcopy = require('deepcopy')
class TransactionSet{
	constructor(index){
		this.index = index;
		this.unusedTransactions  = []
		this.frozenTransactions = []
	}
	add(transaction){
		this.unusedTransactions.push(transaction)
	}
	getUnused(){
		console.log(this.unusedTransactions)
		this.frozenTransactions = deepcopy(this.unusedTransactions);
    		this.unusedTransactions = [];
    		console.log('this.frozenTransaction : ' + this.frozenTransactions)
    		return this.frozenTransactions;
	}
	getFrozen(){
		return this.frozenTransactions
	}
	addAll(transactions){
		Array.prototype.push.apply(this.unusedTransactions,transactions)
	}
}
module.exports =TransactionSet