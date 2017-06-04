(function addEventListeners() {
	self.addEventListener('install', function(event) {
		event.waitUntil(
			caches.open('airhorner').then(function(cache) {
				return cache.addAll([
					'/'
				]);
			})
		);
	});

	self.addEventListener('fetch', function(event) {
		var request = event.request;
		
		event.respondWith(
			caches.open('network:' + self.scope + ':').then(function(networkCache) {
				return networkCache.match(request).then(function(response) {
					if (response) {
						return response;
					} else {
						return fetch(request.clone()).then(function(response) {
							if (response.status >= 400) {
								return Promise.reject(new Error(response.statusText));
							}

							networkCache.put(request, response.clone());

							return response;
							}).catch(function() {
								return getFallbackCache().then(function(fallbackCache) {
									return fallbackCache.match(request);
							});
						});
					}
				});
			})
		);
	});
})();
