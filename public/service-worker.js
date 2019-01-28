

const filesToCache = 
  [ 
    '/external/axios.min.js',
    '/external/axios.min.map',
    '/external/handlebars-v4.0.12.js',
    '/images/favicon.ico',
    '/images/ajax-loader.gif',
    '/',
    '/models/audio.js',
    '/models/db.js',
    '/models/emotionTypes.js',
    '/models/html-template.js',
    '/models/main.js',
    '/models/matrix-cursor-effect.js',
    '/models/matrix.js',
    '/models/router.js',
    '/models/settings.js',
    '/models/texts.he.js',
    '/models/texts.js',
    '/music/Adele_1.mp3',
    '/music/Adele_2.mp3',
    '/music/Aerosmith_1.mp3',
    '/music/Alicia_Keys_2.mp3',
    '/music/Alicia_keys_1.mp3',
    '/music/Arik_Einstein_1.mp3',
    '/music/Arik_Einstein_2.mp3',
    '/music/Arik_Einstein_3.mp3',
    '/music/Aviv_Gefen_1.mp3',
    '/music/Aviv_Gefen_2.mp3',
    '/music/Avraham_Tal_1.mp3',
    '/music/Avraham_Tal_2.mp3',
    '/music/classical.mp3',
    '/music/mozart.mp3',
    '/music/tchaikovsky.mp3',
    '/music/vivaldi.mp3',
    '/pages/admin.js',
    '/pages/instructions.js',
    '/pages/loading.js',
    '/pages/music-selection.js',
    '/pages/session-form.js',
    '/pages/task.js',
    '/pages/the-end.js',
    '/service-worker.js',
    '/stylesheets/admin.css',
    '/stylesheets/he.css',
    '/stylesheets/instructions.css',
    '/stylesheets/music-selection.css',
    '/stylesheets/session-form.css',
    '/stylesheets/style.css',
    '/stylesheets/task.css',
    '/templates/admin.html',
    '/templates/fixation.html',
    '/templates/instructions.html',
    '/templates/loading.html',
    '/templates/matrix.html',
    '/templates/music-selection.html',
    '/templates/session-form.html',
    '/templates/task.html',
    '/templates/the-end.html',
    '/music2',
    '/settings',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%201.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2010.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2011.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2012.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2013.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2014.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2015.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2016.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2017.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2018.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2019.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%202.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2020.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2021.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2022.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2023.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2024.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2025.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2026.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2027.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2028.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2029.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%203.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%2030.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%204.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%205.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%206.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%207.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%208.jpg',
    '/images/Set%20A/result/training/block%201/block%201%20matrix%209.jpg',
    '/images/Set%20A/result/training/block%201/map.xml',
    ];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log(response);
      return response || fetch(event.request);
    })
  );
 });