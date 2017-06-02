(function () {
	'use strict';
	
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', { scope: '/' })
			.then(function() {
				console.log('ServiceWorker registration success. Please refresh a few of times to preventing SW Fail');
			})
			.catch(function() {
				console.log('ServiceWorker registration failed. Didn\'t you forget to enable Experimental web features at your browse?');
			});
	}
})();
