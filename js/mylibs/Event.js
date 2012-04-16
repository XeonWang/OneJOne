(function(){
	
	var $loadListeners = [];
	var headLoaded;
	
	function loadListener(){
		$loadListeners.forEach(function(fn){
			fn.call(this);
		});
	}
	
	window.addEventListener('load', loadListener);
	
	OneJOne.EventManager = {
		registerLoadListener : function(listener){
			$loadListeners.push(listener);
		}
	}
	
	OneJOne.onReady = OneJOne.EventManager.registerLoadListener;
})();