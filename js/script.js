/* Author: Xeon Wang
*
*/
OneJOne.onReady(function(){
	OneJOne.define('Man', {
		extend : ['entry.Person'],
		name : 'man',
		say : function(name){
			this.callParent(arguments);
			alert("Man say..." + name);
		}
	});
	
//	var tester = OneJOne.create('Man', {name : 'wzq'});
//	console.log(tester);
});
