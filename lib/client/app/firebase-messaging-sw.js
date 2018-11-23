// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '339197570434'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();





// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken().then(function(currentToken) {
  if (currentToken) {
    // sendTokenToServer(currentToken);
    // updateUIForPushEnabled(currentToken);
  } else {
    // setTokenSentToServer(false);
  }
}).catch(function(err) {
  // console.log('An error occurred while retrieving token. ', err);
  // showToken('Error retrieving Instance ID token. ', err);
  // setTokenSentToServer(false);
});

// // Callback fired if Instance ID token is updated.
// messaging.onTokenRefresh(function() {
//   messaging.getToken().then(function(refreshedToken) {
//     console.log('Token refreshed.');
//     // Indicate that the new Instance ID token has not yet been sent to the
//     // app server.
//     // setTokenSentToServer(false);
//     // Send Instance ID token to app server.
//     sendTokenToServer(refreshedToken);
//     // ...
//   }).catch(function(err) {
//     console.log('Unable to retrieve refreshed token ', err);
//     // showToken('Unable to retrieve refreshed token ', err);
//   });
// });

messaging.setBackgroundMessageHandler(function(payload) {
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

