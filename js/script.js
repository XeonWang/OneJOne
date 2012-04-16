/* Author: Xeon Wang

*/
OneJOne.define('Person',{
	name : 'person',
	say : function(){
		alert("Say...");
	}
});

OneJOne.define('Man', {
	extend : 'Person',
	say : function(){
		alert("Man say...");
	}
});

//var tester = new Man({name : 'wzq'});
//console.log(tester);
















