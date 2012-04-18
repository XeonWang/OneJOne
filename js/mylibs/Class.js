(function(){
	var global = this;
	var dependenceConfig = ['extend', 'require']; 
	
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
				var member = classBody[field];
				if(typeof member == 'function'){
					member.$owner = newClass;
					member.$name = field;
				}
				prototype[field] = member;
			}
			global[className] = OneJOne.ClassManager.$classes[className] = newClass;
			return newClass;
		},
		
		getInstance : function(className, config){
			var cls = OneJOne.ClassManager.getClass(className);
			return new cls(config);
		},
		
		loadClass : function(className){
			var loaded = OneJOne.ClassManager.getClass(className);
			if(loaded) return;
			var classPath = this.getClassPath(className);
			var head = OneJOne.html.getHead();
			var script = document.createElement('script'),
				onLoad = function(){console.log(className + ' loaded.')},
				onError = function(){alert('load file error...');};
			
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', classPath);
			script.onload = onLoad;
			script.onerror = onError;
			
			head.appendChild(script);
		},
		
		getClassPath : function(className){
			className = className.toLowerCase().replace('.', '/');
			return 'js/' + className + '.js';
		}
	};
	
	OneJOne.define = OneJOne.ClassManager.define;
	OneJOne.create = OneJOne.ClassManager.getInstance;
	
	OneJOne.ClassManager.registerProcessor('load', function(cls, classBody){
		dependenceConfig.forEach(function(config){
			var configValue = classBody[config];
			if(configValue){
				configValue.forEach(function(className){
					if(!OneJOne.ClassManager.getClass(className)){
						OneJOne.ClassManager.loadClass(className);
					}
				});
			}
		});
	});
	
	OneJOne.ClassManager.registerProcessor('extend', function(cls, classBody){
		if(!OneJOne.typeAlert([{
			entry : cls, type : 'function'
		}])) return false;
		
		var parent = classBody && classBody.extend;
		if(parent && parent.length>0 && typeof parent[0] == 'string'){
			parent = OneJOne.ClassManager.getClass(parent[0]);
		}else{
			parent = OneJOne.Base;
		}
		if(parent){
			var parentPrototype = parent.prototype;
			var T = function(){};
			T.prototype = parentPrototype;
			cls.prototype = new T();
			cls.prototype.superClass = cls.superClass = parentPrototype;
//			cls.prototype.constructor = cls;
			delete classBody.extend;
		}
	})
})();