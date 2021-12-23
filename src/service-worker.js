importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyBoE4IozC_dsI_DNYEr50aie2QvTbogG7Q",
  authDomain: "ume-functions.firebaseapp.com",
  projectId: "ume-functions",
  storageBucket: "ume-functions.appspot.com",
  messagingSenderId: "1002216754764",
  appId: "1:1002216754764:web:c4b55a63da627d1baa6ee9",
  measurementId: "G-Q9ENG1M922"
});

const messaging = firebase.messaging();
