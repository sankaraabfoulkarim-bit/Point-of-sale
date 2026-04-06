// ══════════════════════════════════════════════════════════════
//  🔥 DIGITALE SOLUTION — FIREBASE CONFIG
//  ➜  Remplacez les valeurs ci-dessous par celles de votre
//     projet Firebase (console.firebase.google.com)
//
//  ÉTAPES :
//  1. firebase.google.com → Nouveau projet
//  2. Ajouter une app Web (</>)
//  3. Copier la config ici
//  4. Activer Authentication → Email/Password
//  5. Activer Firestore Database (mode production)
//  6. Coller les règles Firestore (voir GUIDE.md)
// ══════════════════════════════════════════════════════════════

const firebaseConfig = {
  apiKey: "AIzaSyBrQy4VuncezPeZ6vPTaiTmTWxqTVQm1ZI",
  authDomain: "commerce-3ae6e.firebaseapp.com",
  projectId: "commerce-3ae6e",
  storageBucket: "commerce-3ae6e.firebasestorage.app",
  messagingSenderId: "946906333487",
  appId: "1:946906333487:web:d6cd511e80a3a0d0b921da"
};
// ── PIN Administrateur Développeur ────────────────────────────
// Accès : triple-clic sur le logo "DIGITALE SOLUTION"
// Changez ce PIN avant déploiement en production !
const DEV_PIN = "2580";

// ── Exportation ───────────────────────────────────────────────
export { FIREBASE_CONFIG, DEV_PIN };
