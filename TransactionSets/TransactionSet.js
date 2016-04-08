import deepcopy
class TransactionSet{
	constructor(index){
		this.index = index;
		this.unusedTransactioins  = []
		this.frozenTransactions = []
	}
	add(transaction){
		this.unusedTransactioins.push(transaction)
	}
	getUnused(){
		//todo 
	}
	getFrozen(){
		return frozenTransactions
	}
}