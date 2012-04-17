/* Author: Xeon Wang

*/
OneJOne.define('Person',{
	name : 'person',
	say : function(){
		alert("Say...");
	},
	constructor : function(config){
		var key;
		for(key in config){
			this[key] = config[key];
		}
	}
});

OneJOne.define('Man', {
	extend : 'Person',
	say : function(){
		alert("Man say...");
	}
});

var tester = OneJOne.create('Man', {name : 'wzq'});
console.log(tester);















