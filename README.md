# ☀️ Solar System Live Quiz Game

A real-time interactive quiz game for teachers and students to learn about the Solar System. Built with HTML5, Firebase Realtime Database, and deployed on GitHub Pages.

## 🌟 Features

- **Live Classroom Mode**: Teacher projects the game, students join with a code
- **Real-time Synchronization**: All answers sync instantly across devices
- **12 Interactive Questions**: Mix of regular and bonus challenge questions
- **Live Leaderboard**: Rankings update after each question
- **Bot Players**: Add demo students for testing
- **Mobile Friendly**: Works on tablets, phones, and desktops
- **Beautiful UI**: Space-themed design with smooth animations
- **Two-Role System**: Separate teacher dashboard and student interface

## 🚀 Quick Start

### Step 1: Set Up Firebase (5 minutes)

1. Go to **[Firebase Console](https://console.firebase.google.com/)**
2. Click **Create Project**
3. Name it `solar-quiz-game`
4. Skip Google Analytics
5. Click **Create Project**
6. Wait for setup to complete

### Step 2: Enable Realtime Database

1. In Firebase Console, go to **Realtime Database** (left sidebar)
2. Click **Create Database**
3. Select **Start in test mode** (for development)
4. Choose your region (closest to you)
5. Click **Enable**
6. Copy your **Database URL** (looks like `https://your-project.firebaseio.com`)

### Step 3: Get Your Firebase Credentials

1. In Firebase Console, click the gear icon ⚙️ → **Project Settings**
2. Go to the **General** tab
3. Scroll to "Your apps" section
4. Click **</>** (Web app)
5. Copy the entire config object that looks like this:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",
    authDomain: "solar-quiz-game.firebaseapp.com",
    projectId: "solar-quiz-game-xxxxx",
    storageBucket: "solar-quiz-game-xxxxx.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc...",
    databaseURL: "https://solar-quiz-game-xxxxx.firebaseio.com"
};
```

### Step 4: Update Configuration

1. In your GitHub repository, open **firebase-config.js**
2. Find the `firebaseConfig` object at the top
3. Replace all the `YOUR_*` placeholders with your actual Firebase credentials
4. Commit and push to GitHub

### Step 5: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Build and deployment"
4. Select **Deploy from a branch**
5. Choose **main** branch
6. Click **Save**
7. Wait 2-3 minutes for deployment

### Step 6: Your Game is Live! 🎉

Your game is now deployed at:
```
https://joy-hub221.github.io/solar-quiz-game
```

## 🎮 How to Play

### For Teachers:

1. Open the game URL on your classroom projector
2. Click **👨‍🏫 Teacher**
3. **Share the Game Code** (6-digit number) with your students
4. Add students:
   - Enter name in the input field and click **Add Student**
   - OR click **+ Add Demo Bots** to add AI players for testing
5. Click **🚀 Launch Live Game** when ready
6. **Question Display**: Each question shows with a 20-second countdown
7. **Monitor Responses**: See which students have answered (✓ = ready, ... = waiting)
8. Click **Reveal Answer** to show the correct option and reveal scores
9. Click **View Standings** to see the live leaderboard
10. Click **Next Orbit** to proceed to the next question

### For Students:

1. Open the game URL on their device/tablet
2. Click **👨‍🎓 Student**
3. Enter the **6-digit Game Code** (from teacher)
4. Enter their **name**
5. Click **Join Game**
6. **Wait for Questions**: They'll see each question appear
7. **Answer**: Click the answer (A, B, C, or D) before time runs out
8. **See Score**: After the teacher reveals the answer, their score updates
9. **View Leaderboard**: See their rank and classmates' scores

## 📊 Quiz Content

### 12 Questions About the Solar System:

**Regular Questions (1000 pts each):**
1. Which planet is closest to the Sun? → Mercury
2. Which planet is the "Bright & Boiling Neighbor"? → Venus
3. Why is Earth special? → Has life
4. What color is Mars? → Red
5. What's between Mars and Jupiter? → Asteroid Belt
6. Which planet is largest? → Jupiter
7. What makes Saturn recognizable? → Rings
8. Which planet spins on its side? → Uranus
9. Which is the "Windy Blue Marble"? → Neptune
10. What's one Earth year? → One orbit around Sun

**Bonus Challenges (2000 pts each):**
11. What causes day and night? → Rotation
12. What creates seasons? → Revolution + tilt

## 🔧 Customization

### Add More Questions

Edit `index.html` and find the `quizData` array (around line 250):

```javascript
const quizData = [
    // Add a new question like this:
    { 
        q: "Your new question?", 
        o: ["Option A", "Option B", "Option C", "Option D"], 
        a: 0,  // Index of correct answer (0-3)
        bonus: false  // true for double points
    },
    // ... existing questions
];
```

### Change Timer Duration

Find `timeLeft = 20` in the code and change `20` to your desired seconds.

### Change Point Values

Find the line `let pointsValue = isBonus ? 2000 : 1000;` and adjust the numbers.

### Customize Colors

Edit the CSS variables at the top of `index.html`:

```css
:root {
    --accent-blue: #38bdf8;      /* Change main color */
    --accent-purple: #a855f7;    /* Change secondary color */
    --success: #22c55e;          /* Change success color */
    --danger: #ef4444;           /* Change error color */
}
```

## 🐛 Troubleshooting

### "Firebase initialization error"
- Make sure you updated `firebase-config.js` with your credentials
- Check that all fields are filled correctly
- Open browser console (F12) to see the exact error

### "Invalid game code"
- Teacher and students must use the same game code
- Teacher code appears in a purple box at the top
- Code is 6 digits (like `123456`)

### "Answers not syncing"
- Check that Firebase Realtime Database is enabled
- Make sure database is in **test mode** (for development)
- Verify database URL in `firebase-config.js`

### "Game not loading"
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 3+ minutes after enabling GitHub Pages
- Check that all files are committed to GitHub
- Open browser console for error messages

### Students can't join
- Verify game code is exactly right (case and number)
- Check that WiFi/internet connection is stable
- Try refreshing the page
- Make sure teacher is still on the lobby screen

## 🔐 Security & Production

### Development (Current Setup)
✅ Uses Firebase **Test Mode** for easy development
✅ Good for classroom use (behind school WiFi)
⚠️ Anyone with the database URL can access data

### For Production Use
Set up proper Firebase security rules:

1. Go to Firebase Console → **Realtime Database** → **Rules**
2. Replace the default rules with:

```json
{
  "rules": {
    "games": {
      "$gameId": {
        "answers": {
          "$studentId": {
            ".read": true,
            ".write": "root.child('games').child($gameId).child('teacher_id').val() === auth.uid"
          }
        },
        ".read": true,
        ".write": "auth != null"
      }
    }
  }
}
```

3. Enable **Email/Password Authentication** in Firebase
4. Update code to use proper authentication

## 📱 Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome  | ✅ Full Support |
| Firefox | ✅ Full Support |
| Safari  | ✅ Full Support |
| Edge    | ✅ Full Support |
| Mobile Chrome | ✅ Full Support |
| Mobile Safari | ✅ Full Support |

## 🌍 Deployment Options

Your game is currently deployed on:
- **GitHub Pages**: `https://joy-hub221.github.io/solar-quiz-game`

Other deployment options:
- **Netlify**: Free, drag-and-drop deployment
- **Vercel**: Optimized for web apps
- **Firebase Hosting**: Direct Firebase integration

## 📞 Support & Resources

- **Firebase Docs**: https://firebase.google.com/docs
- **Firebase Console**: https://console.firebase.google.com/
- **GitHub Pages Help**: https://pages.github.com/
- **Web Dev Resources**: https://developer.mozilla.org/

## 🎓 Learning Goals

Students will learn:
- ✅ Planet order from the Sun
- ✅ Physical characteristics of planets
- ✅ Earth's unique place in the Solar System
- ✅ How orbital mechanics work
- ✅ Difference between rotation and revolution
- ✅ Why we have day/night and seasons

## 🚀 Future Enhancements

Possible improvements:
- Add more questions (50+)
- Multiplayer teams/competition
- Audio/video explanations
- Teacher analytics dashboard
- Custom question builder
- Student progress tracking
- Leaderboard history

## 📝 File Structure

```
solar-quiz-game/
├── index.html              # Main game (all screens)
├── firebase-config.js      # Firebase setup
├── README.md              # This file
└── .gitignore             # Git configuration
```

## 💡 Tips for Teachers

1. **Test First**: Add demo bots to test the game
2. **Share Code Early**: Give students time to join
3. **Clear Pacing**: Read questions aloud, give time to answer
4. **Encourage Participation**: Use bonus questions to keep engagement
5. **Review Answers**: Use the reveal screen to discuss correct answers
6. **Track Progress**: Check leaderboard after each question

## 🌟 Credits

Created with ❤️ for educators and students learning about space!

---

**Ready to play?** 🚀
1. Deploy the game (follow Quick Start above)
2. Share the URL with your students
3. Let the learning begin!

For questions or issues, check the Troubleshooting section or consult Firebase documentation.
