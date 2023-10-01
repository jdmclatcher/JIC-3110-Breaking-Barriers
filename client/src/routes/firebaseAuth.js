import { auth } from './firebase'; // Import the Firebase authentication object

// Register a new user
export const register = async (email, password) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
        throw error;
    }
};

// Login with email and password
export const login = async (email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        throw error;
    }
};

// Log out
export const logout = async () => {
    try {
        await auth.signOut();
    } catch (error) {
        throw error;
    }
};
