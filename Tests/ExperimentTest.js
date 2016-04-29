var coinKey = require('coinKey')
var Range = require('../Utills/Range')
var randomstring = require('randomstring')
var sha256 = require('sha256')
var randomGenerator = require('random-js').engines.mt19937();

describe('for papers', function() {
	it('', function(done) {
		this.timeout(10000);
		var nodeNums = [50,100,150,200,250,300]
		var results = nodeNums.map(function(value){
			return doExperiments(value)
		})
		var presentationResult = results.map(function(result){
			var data = new Object()
			result.hackers.forEach(function(v,i){
				if(v>=result.rightNode/2){
					data.hacked = 40-i*10
				}
			})
			data.checkNode = result.rightNode
			return data
		})
		console.log(presentationResult)
		done()
	});
});

function doExperiments(nodeNum){
	var publicKeys = Range(nodeNum).map(function(value){
		return coinKey.createRandom().privateKey
	})
	var randomStrings = Range(50).map(function(value){
		return randomstring.generate(value)
	})
	var permissionNums = randomStrings.map(function(randStr){
		var permissionObj = new Object()
		permissionObj.hackers = [0,0,0,0] // 40,30,20,10
		publicKeys.forEach(function(publicKey,currentIndex){
			if(permissionTest(randStr,publicKey,nodeNum)){
				if(currentIndex<=nodeNum*(2/5)){
					permissionObj.hackers[0]++
					if(currentIndex <= nodeNum*(3/10)){
						permissionObj.hackers[1]++
						if(currentIndex <= nodeNum*(1/5)){
							permissionObj.hackers[2]++
							if(currentIndex <= nodeNum*(1/10)){
								permissionObj.hackers[3]++
							}
						}
					}
				}
				permissionObj.rightNode ++
			}
		})
		
		return permissionObj
	})
	return permissionNums
}

function permissionTest(randStr,publicKey,nodeNum){
	var previousHash = sha256(randStr)
	var randNum = randomGenerator.seed(previousHash + publicKey)();
          randNum = sha256(randNum); 
          var randNum2 = sha256(previousHash + publicKey);
          randNum = randNum.charAt(23);
          randNum2 = randNum2.charAt(23);
          if(randNum=== randNum2)
            	return true
          else 
            	return false
}