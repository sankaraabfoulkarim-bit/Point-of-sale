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

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDSs8eZDYBc7NXaSbfP7RLnTgK3YGciRsc",
  authDomain: "caisse-pharma.firebaseapp.com",
  databaseURL: "https://caisse-pharma-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "caisse-pharma",
  storageBucket: "caisse-pharma.firebasestorage.app",
  messagingSenderId: "252994480658",
  appId: "1:252994480658:web:3816ad46eb91fc743f46cb"
};
// ── PIN Administrateur Développeur ────────────────────────────
// Accès : triple-clic sur le logo "DIGITALE SOLUTION"
// Changez ce PIN avant déploiement en production !
const DEV_PIN = "2580";

// ── Exportation ───────────────────────────────────────────────
export { FIREBASE_CONFIG, DEV_PIN };
