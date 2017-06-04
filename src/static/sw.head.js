(function () {
	'use strict';
	
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js', { scope: '/' })
			.then(function() {
				console.log('ServiceWorker registration success');

				// force page refresh to cache requests for service worker
				if (!localStorage.getItem('refreshed')) {
					setTimeout(function() {
						localStorage.setItem('refreshed', true);
						location.reload();
					}, 500);
				}
			})
			.catch(function() {
				console.log('ServiceWorker registration failed. Didn\'t you forget to enable Experimental web features at your browse?');
			});
	}
})();
