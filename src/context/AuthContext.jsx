import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

const AuthContext = createContext();

const ADMIN_EMAILS = ["quoct0447@gmail.com", "lussixussqt@gmail.com"];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Handle the redirect result when user returns from Google sign-in
        getRedirectResult(auth)
            .then((result) => {
                if (result) {
                    console.log("Redirect login successful:", result.user);
                }
            })
            .catch((error) => {
                console.error("Redirect login error:", error);
            });

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            if (isLocalhost) {
                // Popups work fine locally if not blocked; bypasses iframe third-party cookie issues on localhost
                const result = await signInWithPopup(auth, googleProvider);
                return result.user;
            } else {
                // Redirect is safer on production to avoid popup blockers and COOP issues
                await signInWithRedirect(auth, googleProvider);
            }
        } catch (error) {
            console.error("Primary login method failed, trying fallback:", error);
            try {
                // If primary method fails (e.g. popup blocked on localhost), attempt the alternative
                const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
                if (isLocalhost) {
                    await signInWithRedirect(auth, googleProvider);
                } else {
                    const result = await signInWithPopup(auth, googleProvider);
                    return result.user;
                }
            } catch (fallbackError) {
                console.error("All login methods failed:", fallbackError);
                throw fallbackError;
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const isAdmin = user?.email && ADMIN_EMAILS.includes(user.email);

    const value = {
        user,
        loading,
        isAdmin,
        loginWithGoogle,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
