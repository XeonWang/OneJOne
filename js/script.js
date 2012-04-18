/* Author: Xeon Wang

*/
OneJOne.define('Man', {
	extend : ['Person'],
	say : function(name){
		this.callParent(arguments);
		alert("Man say..." + name);
	}
});

var tester = OneJOne.create('Man', {name : 'wzq'});
console.log(tester);