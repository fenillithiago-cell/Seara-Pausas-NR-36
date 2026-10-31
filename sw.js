// Captura Pausas NR 36 – funciona sem internet depois da primeira abertura
const C='pnr36-v1';const ARQ=['./','./index.html','./manifest.webmanifest','./icone-192.png','./icone-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ARQ)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
 // rede primeiro (pega versão nova), cache se estiver sem internet
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));});
