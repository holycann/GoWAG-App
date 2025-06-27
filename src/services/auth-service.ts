import apiClient from "../api/api";
import { FirebaseApp } from "firebase/app";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { serialize } from "cookie";

// Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  username?: string;
  fullname?: string;
  phoneNumber?: string;
  role?: string;
  profilePicture?: string;
}

// Initialize Firebase auth
let auth: Auth | null = null;

const initializeAuth = (app: FirebaseApp) => {
  auth = getAuth(app);
  return auth;
};

const AuthService = {
  initializeAuth,

  // Login with Firebase
  async login(credentials: AuthCredentials): Promise<User> {
    if (!auth) throw new Error("Firebase auth not initialized");

    const { email, password } = credentials;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get token for backend API calls
    const token = await userCredential.user.getIdToken();

    const serializedToken = serialize("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    document.cookie = serializedToken;

    const serializedUser = serialize("userUid", userCredential.user.uid, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    document.cookie = serializedUser;

    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Get user profile from backend
    const response = await apiClient.get("/users/" + userCredential.user.uid);
    return response.data;
  },

  // Register with Firebase
  async register(
    credentials: AuthCredentials,
    username?: string,
    fullname?: string,
    phoneNumber?: string,
    profilePicture?: string
  ): Promise<User> {
    if (!auth) throw new Error("Firebase auth not initialized");

    const { email, password } = credentials;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Get token for backend API calls
    const token = await userCredential.user.getIdToken();

    const serializedToken = serialize("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      // secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    document.cookie = serializedToken;

    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Create user profile in backend
    const userData = {
      id: userCredential.user.uid,
      email,
      username,
      fullname,
      phoneNumber,
      profilePicture,
      role: "user",
    };

    const response = await apiClient.post("/users/profile", userData);
    return response.data;
  },

  // Logout
  async logout() {
    if (!auth) throw new Error("Firebase auth not initialized");

    await signOut(auth);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userUid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!document.cookie.split("; ").find((row) => row.startsWith("token="));
  },

  // Get current user from backend
  async getCurrentUser(): Promise<User | null> {
    if (!this.isAuthenticated()) return null;

    const token = document.cookie.split("; ").find((row) => row.startsWith("token="))?.split("=")[1];
    const userUid = document.cookie.split("; ").find((row) => row.startsWith("userUid="))?.split("=")[1];

    if (!token || !userUid) return null;  

    try {
      const response = await apiClient.get("/users/" + userUid, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Refresh token
  async refreshToken(): Promise<string | null> {
    if (!auth || !auth.currentUser) return null;

    try {
      const token = await auth.currentUser.getIdToken(true);
      document.cookie = "token=" + token;
      return token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  },
};

export default AuthService;
