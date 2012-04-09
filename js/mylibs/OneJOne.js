OneJOne = {};

OneJOne.apply = function(target, source){
	var i;
	for(i in source){
		target[i] = source[i];
	}
};

OneJOne.typeCheck = function(name, type){
	var actualType = typeof name;
	return type === actualType;
}

OneJOne.typeAlert = function(targetArray){
	var ln = targetArray.length;
	var target;
	for(target=0 ; target<ln ; target++){
		if(!OneJOne.typeCheck(targetArray[target].entry, targetArray[target].type)){
			alert("Type error!");
			return false;
		}
	}
	return true;
}