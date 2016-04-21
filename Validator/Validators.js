'use strict'
import Validator
class Validators{
	construtor(){
		this.validators = []
		for(var i = 0 ; i<10;i++){
			(function(j){
				validators.push(new Validator(j))
			})(i)
		}
	}
	get(i){
		return this.validators[i]
	}
}

module.exports = Validator