importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA8JhpIVGZ_EHNfkYob1kkOsoANgJ0ShZE",
  authDomain: "greenlifespa-c902e.firebaseapp.com",
  projectId: "greenlifespa-c902e",
  storageBucket: "greenlifespa-c902e.firebasestorage.app",
  messagingSenderId: "842746435603",
  appId: "1:842746435603:web:6f07a823b74d5b86ec47e6"
});

const messaging = firebase.messaging();

// Nhận thông báo khi app đang đóng / chạy nền
messaging.onBackgroundMessage(function(payload) {
  const { title, body } = payload.notification || {};
  self.registration.showNotification(title || 'Green Life Spa', {
    body: body || 'Bạn có thông báo mới',
    icon: '/logo.png',
    badge: '/logo.png',
    data: payload.data || {}
  });
});

// Khi user nhấn vào thông báo → mở app
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(list) {
      if (list.length > 0) return list[0].focus();
      return clients.openWindow('/');
    })
  );
});
