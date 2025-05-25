import { getDb } from "./db";

class UserRepository {
  constructor() {
    this.db = null;
  }

  async init() {
    if (!this.db) {
      this.db = await getDb();
      // traer o y crear la base
      await this._createUserTable();
    }
  }

  async _createUserTable() {
    try {
      await this.db.runAsync(`
        CREATE TABLE IF NOT EXISTS user (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL,
          expired TEXT,
          token TEXT,
          kind TEXT,
          localId TEXT,
          refreshToken TEXT,
          registered INTEGER
        );
      `);
    } catch (error) {
      console.error("Error creating user table:", error);
    }
  }

  async saveUser(userData) {
    const { email, expired, token, kind, localId, refreshToken, registered } =
      userData;

    return await this.db.runAsync(
      `INSERT INTO user 
        (email, expired, token, kind, localId, refreshToken, registered) 
       VALUES (?, ?, ?, ?, ?, ?, ?);`,
      [email, expired, token, kind, localId, refreshToken, registered ? 1 : 0]
    );
  }

  async getUser() {
    try {
      const result = await this.db.getAllAsync("SELECT * FROM user LIMIT 1;");
      if (result.length > 0) {
        const user = result[0];
        user.registered = Boolean(user.registered);
        return user;
      }
      return null;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  async deleteUser() {
    return await this.db.runAsync("DELETE FROM user;");
  }
}

const userRepository = new UserRepository();
export default userRepository;
