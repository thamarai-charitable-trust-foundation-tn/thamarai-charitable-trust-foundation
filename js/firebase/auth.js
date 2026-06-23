/* ==========================================================================
   AUTHENTICATION UTILITIES (FIREBASE AUTH + FIRESTORE)
   ========================================================================== */

import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import {
    getDocument,
    createDocument
} from "./firestore.js";

// Firestore collections owned by this module
const ADMINS_COLLECTION = "admins";
const LOGIN_HISTORY_COLLECTION = "loginHistory";

// ========================================
// GOOGLE PROVIDER
// ========================================
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// ========================================
// WATCH AUTH STATE
// ========================================
export function watchAuth(callback) {
    return onAuthStateChanged(auth, callback);
}

// ========================================
// GOOGLE SIGN-IN (login pages & registration)
// ========================================
export async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
}

// Alias used by registration page
export async function signInWithGoogleForVerification() {
    return signInWithGoogle();
}

// ========================================
// LOGOUT
// ========================================
export async function logout() {
    await signOut(auth);
}

// ========================================
// CHECK ADMIN ROLE
// ========================================
export async function isAdmin(uid) {
    if (!uid) {
        return false;
    }

    try {
        const adminDoc = await getDocument(ADMINS_COLLECTION, uid);
        return !!adminDoc;
    } catch (error) {
        console.error("Error checking admin role:", error);
        return false;
    }
}

// ========================================
// RECORD LOGIN HISTORY
// ========================================
export async function recordLogin(user) {
    if (!user) {
        return;
    }

    try {
        await createDocument(LOGIN_HISTORY_COLLECTION, {
            uid: user.uid,
            email: user.email,
            device: navigator.userAgent.substring(0, 100)
        });
    } catch (error) {
        console.error("Error recording login history:", error);
    }
}
