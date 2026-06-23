// ========================================
// IMPORTS
// ========================================

import {

    logout,

    watchAuth,

    recordLogin,

    isAdmin,

    signInWithGoogle

}
    from "../firebase/auth.js";

import {

    showSuccess,

    showError

}
    from "../utils/toast.js";

// ========================================
// ELEMENTS
// ========================================

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );

const loginInfo =
    document.getElementById(
        "loginInfo"
    );

const loginError =
    document.getElementById(
        "loginError"
    );

const loginLoading =
    document.getElementById(
        "loginLoading"
    );

const adminLoginBtn =
    document.getElementById(
        "adminLoginBtn"
    );

// ========================================
// AUTH CHECK
// ========================================

watchAuth(

    async user => {

        try {

            if (!user) {
                return;
            }

            const admin =
                await isAdmin(
                    user.uid
                );

            if (
                admin &&
                !window.location.pathname.includes(
                    "admin-dashboard.html"
                )
            ) {
                location.href =
                    "admin-dashboard.html";
            } else if (!admin) {
                await logout();
                showErrorMessage("நிர்வாகி அனுமதி இல்லை. இந்த பக்கத்தை அணுக உங்களுக்கு உரிமை இல்லை.");
            }

        }
        catch (error) {

            console.error(
                error
            );

        }

    }

);

// ========================================
// GOOGLE SIGN-IN HANDLER
// ========================================

if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", handleAdminGoogleLogin);
}

async function handleAdminGoogleLogin() {

    if (loginLoading) {
        loginLoading.style.display = "block";
    }

    if (adminLoginBtn) {
        adminLoginBtn.disabled = true;
    }

    try {
        hideError();

        const user = await signInWithGoogle();

        const admin = await isAdmin(user.uid);

        if (!admin) {
            await logout();
            throw new Error("நிர்வாகி அனுமதி இல்லை. இந்த கணக்கு நிர்வாகி கணக்காக பதிவு செய்யப்படவில்லை.");
        }

        await recordLogin(user);

        showSuccess("நிர்வாகி உள்நுழைவு வெற்றிகரமாக முடிந்தது");

        setTimeout(() => {
            location.href = "admin-dashboard.html";
        }, 1000);

    }
    catch (error) {

        console.error(error);

        // User cancelled the Google popup — don't show error
        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
            if (loginLoading) loginLoading.style.display = "none";
            if (adminLoginBtn) adminLoginBtn.disabled = false;
            return;
        }

        showErrorMessage(
            error.message ||
            "Google மூலம் உள்நுழைய முடியவில்லை"
        );

        if (loginLoading) {
            loginLoading.style.display = "none";
        }

    }
    finally {
        if (adminLoginBtn) {
            adminLoginBtn.disabled = false;
        }
        if (loginLoading) {
            loginLoading.style.display = "none";
        }
    }
}

// ========================================
// ERROR
// ========================================

function showErrorMessage(
    message
) {
    if (
        !loginError
    ) {
        return;
    }

    if (loginInfo) {
        loginInfo.style.display = "none";
    }

    loginError.style.display =
        "block";

    loginError.textContent =
        message;
}

function showInfoMessage(
    message
) {
    if (
        !loginInfo
    ) {
        return;
    }

    if (loginError) {
        loginError.style.display = "none";
    }

    loginInfo.style.display =
        "block";

    loginInfo.textContent =
        message;
}

function hideError() {
    if (
        loginError
    ) {
        loginError.style.display =
            "none";

        loginError.textContent =
            "";
    }
    if (
        loginInfo
    ) {
        loginInfo.style.display =
            "none";

        loginInfo.textContent =
            "";
    }
}
