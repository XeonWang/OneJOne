OneJOne.Base = function(){};
OneJOne.Base.prototype = {
	constructor : function(){
		return this;
	},
	
	callParent : function(args){
		var method = this.callParent.caller;
		var superClass = method.$owner.superClass;
		superClass[method.$name].apply(this, args);
	}
}