import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User as FirebaseUser } from "firebase/auth";
import { getFirebaseApp } from "@/lib/firebase";
import { apiClient, tokenManager } from "@/api/api";

// Authentication interfaces
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

// Define authentication service as a singleton
class AuthService {
  private static instance: AuthService;
  private app: FirebaseApp | null = null;
  
  private constructor() {
    // Private constructor to prevent direct construction calls with 'new'
    this.app = getFirebaseApp();
  }
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Initialize Firebase Auth in the service
  private initializeAuth(app: FirebaseApp) {
    if (!app) return null;
    return getAuth(app);
  }

  async login(credentials: AuthCredentials): Promise<User> {
    try {
      const auth = this.initializeAuth(this.app!);
      if (!auth) throw new Error("Auth not initialized");
      
      const { email, password } = credentials;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get token from Firebase user
      const token = await firebaseUser.getIdToken();
      
      // Store tokens in TokenManager instead of localStorage
      tokenManager.setAuthToken(token);
      
      // You might want to store a refresh token as well if your backend provides one
      // For now, we'll use the Firebase refresh token mechanism
      
      // Fetch user profile from your backend
      const response = await apiClient.get(`/users/profile`);
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        ...response.data
      };
      
      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async register(
    credentials: AuthCredentials,
    username?: string,
    fullname?: string,
    phoneNumber?: string,
    profilePicture?: string
  ): Promise<User> {
    try {
      const auth = this.initializeAuth(this.app!);
      if (!auth) throw new Error("Auth not initialized");
      
      const { email, password } = credentials;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get token from Firebase user
      const token = await firebaseUser.getIdToken();
      
      // Store tokens in TokenManager instead of localStorage
      tokenManager.setAuthToken(token);
      
      // Create user profile in your backend
      const response = await apiClient.post(`/users/profile`, {
        userId: firebaseUser.uid,
        email,
        username,
        fullname,
        phoneNumber,
        profilePicture
      });
      
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        username,
        fullname,
        phoneNumber,
        profilePicture
      };
      
      return user;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  async logout() {
    try {
      const auth = this.initializeAuth(this.app!);
      if (!auth) throw new Error("Auth not initialized");
      
      await signOut(auth);
      
      // Clear tokens from TokenManager
      tokenManager.clearTokens();
      
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    // Check if there's a valid token in TokenManager
    return !!tokenManager.getAuthToken();
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const auth = this.initializeAuth(this.app!);
      if (!auth || !auth.currentUser) return null;
      
      const firebaseUser = auth.currentUser;
      
      // Fetch user profile from your backend
      const response = await apiClient.get(`/users/profile`);
      
      const user: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        ...response.data
      };
      
      return user;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      const auth = this.initializeAuth(this.app!);
      if (!auth || !auth.currentUser) return null;
      
      const token = await auth.currentUser.getIdToken(true);
      tokenManager.setAuthToken(token);
      return token;
    } catch (error) {
      console.error("Token refresh error:", error);
      return null;
    }
  }
}

// Export singleton instance
const authService = AuthService.getInstance();
export default authService;
