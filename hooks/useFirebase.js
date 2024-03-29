import { useEffect, useState } from "react";
import firebaseAppInitialize from "../components/Login/Firebase/firebase.init";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    // getIdToken,
} from "firebase/auth";

firebaseAppInitialize();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    // const [token, setToken] = useState("");

    const auth = getAuth();

    const handleRegister = (email, password, navigate) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((Result) => {
                // Signed in
                // const user = Result.user;
                alert("Registered Success!");
                // setUser({ displayName: name, email: email });
                saveUser(email, "customer"); //save user info to db
                // handleUpdate(name);
                setError("");
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    const saveUser = (email, role) => {
        const userData = { email, role };
        fetch("https://mighty-thicket-60343.herokuapp.com/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData),
        });
    };

    const handleSignIn = (email, password, navigate) => {
        setLoading(true);
        // console.log(email, password);
        signInWithEmailAndPassword(auth, email, password)
            .then((Result) => {
                // Signed in
                setError("");
                alert("Login Success!");
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleGoogleSignIn = (navigate) => {
        setLoading(true);

        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // const user = result.user;
                setError("");
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleSignOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                alert("Sign-out Successful.");
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    };

    const handleUpdate = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name,
        })
            .then(() => {
                // Profile updated!
                setError("");
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    // observer of changing of auth sate
    useEffect(() => {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                /* getIdToken(user).then((idToken) => {
                    // console.log(idToken);
                    setToken(idToken);
                }); */
            } else {
                setUser({});
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    return {
        handleRegister,
        handleSignIn,
        handleGoogleSignIn,
        handleSignOut,
        user,
        loading,
        error,
        setError,
        // token,
    };
};

export default useFirebase;
