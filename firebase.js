<!-- Firebase SDKs -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>

<script>
  const firebaseConfig = {
    apiKey: "AIzaSyC7LjxapWLQCW_zLRCOZS25hWVEaOG1mFY",
    authDomain: "theolib-426cf.firebaseapp.com",
    projectId: "theolib-426cf",
    storageBucket: "theolib-426cf.firebasestorage.app",
    messagingSenderId: "879359514394",
    appId: "1:879359514394:web:259ad5ed2e8949e2e97ea3"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();
</script>
