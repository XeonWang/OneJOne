(function(){
	var global = this;
	
	OneJOne.ClassManager = {
		$classes : {},
		
		$processors : [],
		
		getClass : function(className){
			return this.$classes[className];
		},
		
		registerProcessor : function(name, fn, position){
			if(!OneJOne.typeAlert([{
				entry : name, type : 'string'
			},{
				entry : fn, type : 'function'
			}])) return false;
			
			var value = {name : name, fn : fn};
			
			switch(position){
				case "first": 
					$processors.unshift(value);
					return;
				case "last":
					$processors.push(value);
					return;
				case undefined:
					this.$processors.push(value)
					return;
				default:
					var i = $processors.indexOf(position);
					$processors.splice(i+1, 0, value);
					return;
			}
		},
		
		define : function(className, classBody){
			var newClass = function(){
				return this.constructor.apply(this, arguments);
			};
			
			newClass.constructor = function(){
				return this;
			}
			
			var processorIndex;
			for(processorIndex=0 ;  processorIndex<OneJOne.ClassManager.$processors.length ; processorIndex++){
				OneJOne.ClassManager.$processors[processorIndex].fn(newClass, classBody);
			}
			
			var prototype = newClass.prototype;
			prototype.$className = className;
			var field;
			for(field in classBody){
				prototype[field] = classBody[field];
			}
			global[className] = OneJOne.ClassManager.$classes[className] = newClass;
			return newClass;
		},
		
		getInstance : function(className, config){
			var cls = OneJOne.ClassManager.getClass(className);
			return new cls(config);
		}
	};
	
	OneJOne.define = OneJOne.ClassManager.define;
	OneJOne.create = OneJOne.ClassManager.getInstance;
	
	OneJOne.ClassManager.registerProcessor('extend', function(cls, classBody){
		if(!OneJOne.typeAlert([{
			entry : cls, type : 'function'
		}])) return false;
		
		var parent = classBody && classBody.extend;
		if(parent && typeof parent == 'string'){
			parent = OneJOne.ClassManager.getClass(parent);
		}else{
			parent = OneJOne.Base;
		}
		if(parent){
			var parentPrototype = parent.prototype;
			var T = function(){};
			T.prototype = parentPrototype;
			cls.prototype = new T();
//			cls.prototype.constructor = cls;
			delete classBody.extend;
		}
	})
})();