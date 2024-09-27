// 파이어베이스 메시징을 위한 서비스 워커
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);

// 서비스워커에서 사용할 파이어베이스 설정
firebase.initializeApp({
  apiKey: 'AIzaSyAuJssKqIuXvzU3EEA2tSZi8ss_CexDwgE',
  authDomain: 'fanpool-4793d.firebaseapp.com',
  projectId: 'fanpool-4793d',
  storageBucket: 'fanpool-4793d.appspot.com',
  messagingSenderId: '394629578591',
  appId: '1:394629578591:web:a2237701e54c5c75c6c0ea',
  measurementId: 'G-P4LL243SQS',
});

// 백그라운드에서 메시지를 처리할 수 있도록 인스턴스를 생성하고 이벤트를 등록
firebase.messaging();
