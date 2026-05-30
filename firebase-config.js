// Firebase Configuration
// Replace these with your Firebase project credentials

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "https://YOUR_PROJECT.firebaseio.com"
};

// Initialize Firebase
let app;
let db;

try {
    app = firebase.initializeApp(firebaseConfig);
    db = firebase.database();
    console.log("✅ Firebase initialized successfully!");
} catch (error) {
    console.error("❌ Firebase initialization error:", error);
    console.error("Make sure to update firebase-config.js with your credentials!");
}

// Get database reference
function getDatabase() {
    if (!db) {
        console.error("Database not initialized. Check firebase-config.js");
        return null;
    }
    return db;
}

// Helper function to save game session
function saveGameSession(gameCode, sessionData) {
    if (!db) return;
    const ref = db.ref('games/' + gameCode);
    ref.set(sessionData).catch(error => {
        console.error("Error saving game session:", error);
    });
}

// Helper function to update student answer
function updateStudentAnswer(gameCode, studentId, studentName, answer) {
    if (!db) return;
    const ref = db.ref('games/' + gameCode + '/answers/' + studentId);
    ref.set({
        name: studentName,
        answer: answer,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    }).catch(error => {
        console.error("Error updating answer:", error);
    });
}

// Helper function to listen for game updates
function listenForGameUpdates(gameCode, callback) {
    if (!db) return;
    const ref = db.ref('games/' + gameCode);
    ref.on('value', (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        }
    }, error => {
        console.error("Error listening for updates:", error);
    });
}

// Helper function to get leaderboard
function getLeaderboard(gameCode, callback) {
    if (!db) return;
    const ref = db.ref('games/' + gameCode + '/leaderboard');
    ref.on('value', (snapshot) => {
        if (snapshot.exists()) {
            callback(snapshot.val());
        } else {
            callback([]);
        }
    });
}

console.log("Firebase configuration loaded!");
