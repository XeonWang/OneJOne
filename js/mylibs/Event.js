(function(){
	
	var $loadListeners = [];
	var headLoaded;
	
	function loadListener(){
		$loadListeners.forEach(function(fn){
			fn.call(this);
		});
	}
	
	function onWindowLoad(){
		loadListener();
	}
	
	window.addEventListener('load', onWindowLoad);
	
	OneJOne.EventManager = {
		registerLoadListener : function(listener){
			$loadListeners.push(listener);
		}
	}
	
	OneJOne.onReady = OneJOne.EventManager.registerLoadListener;
})();