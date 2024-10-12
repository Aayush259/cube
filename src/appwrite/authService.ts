import { CreateNewAccount, LoginUser } from "@/interfaces/interface";
import config from "./config";
import { Client, Account, ID, Models } from "appwrite";

class AuthService {
  // New client created.
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.API_ENDPOINT).setProject(config.PROJECT_ID);
    this.account = new Account(this.client);
  }

  // Service to create new user account.
  async createNewAccount({
    email,
    password,
    name,
  }: CreateNewAccount): Promise<Models.Session> {
    try {
      // Create new user account.
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // If user account created successfully, then login the user.
      if (userAccount) {
        return this.loginExistingUser({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite createNewAccount service error:", error);
      throw error;
    }
  }

  // Service to login existing user.
  async loginExistingUser({
    email,
    password,
  }: LoginUser): Promise<Models.Session> {
    try {
      const userLogin = await this.account.createEmailPasswordSession(
        email,
        password
      );
      return userLogin;
    } catch (error) {
      console.log("Appwrite loginExistingUser service error:", error);
      throw error;
    }
  }

  // Service to get current logged in user data.
  async getCurrentUser(): Promise<Models.User<Models.Preferences>> {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      console.log("Appwrite getCurrentUser service error:", error);
      throw error;
    }
  }

  // Service to logout user.
  async logout(): Promise<boolean> {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.log("Appwrite logout service error:", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
