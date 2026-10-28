var C='skhs-v1',SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(SHELL)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;var u=new URL(r.url);
if(!(u.origin===location.origin||u.hostname==='www.gstatic.com'||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'))return;
e.respondWith(caches.open(C).then(function(c){return fetch(r).then(function(n){if(n&&(n.ok||n.type==='opaque'))c.put(r,n.clone());return n}).catch(function(){return c.match(r).then(function(m){return m||(r.mode==='navigate'?c.match('index.html'):Response.error())})})}))});
