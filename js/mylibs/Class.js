(function(){
	var global = this;
	global.OneJOne = {};
	OneJOne.define = function(className, classBody, callback){
		var newClass = function(){};
		var prototype = newClass.prototype;
		prototype.$className = className;
		var field;
		for(field in classBody){
			prototype[field] = classBody[field];
		}
		global[className] = newClass;
		return newClass;
	}
})();