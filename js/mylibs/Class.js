(function(){
	var global = this;
	
	OneJOne.ClassManager = {
		$classes : {},
		
		$processors : {},
		
		getClass : function(className){
			return this.$classes[className];
		},
		
		registerProcessor : function(name, fn){
			if(!OneJOne.typeAlert([{
				entry : name, type : 'string'
			},{
				entry : fn, type : 'function'
			}])) return false;
			
			this.$processors[name] = fn;
		},
		
		define : function(className, classBody){
			var newClass = function(){};
			
			var processorName;
			for(processorName in OneJOne.ClassManager.$processors){
				OneJOne.ClassManager.$processors[processorName](newClass, classBody);
			}
			
			var prototype = newClass.prototype;
			prototype.$className = className;
			var field;
			for(field in classBody){
				prototype[field] = classBody[field];
			}
			global[className] = OneJOne.ClassManager.$classes[className] = newClass;
			return newClass;
		}
	};
	
	OneJOne.define = OneJOne.ClassManager.define;
	
	OneJOne.ClassManager.registerProcessor('extend', function(cls, classBody){
		if(!OneJOne.typeAlert([{
			entry : cls, type : 'function'
		}])) return false;
		
		var parent = classBody && classBody.extend;
		if(parent && typeof parent == 'string'){
			parent = OneJOne.ClassManager.getClass(parent);
		}
		if(parent){
			var parentPrototype = parent.prototype;
			var T = function(){};
			T.prototype = parentPrototype;
			cls.prototype = new T();
			cls.prototype.constructor = cls;
			delete classBody.extend;
		}
	})
})();