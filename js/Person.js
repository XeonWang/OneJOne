OneJOne.define('Person',{
	name : 'person',
	say : function(name){
		alert("Say..." + name);
	},
	constructor : function(config){
		var key;
		for(key in config){
			this[key] = config[key];
		}
	}
});