import * as SQLite from "expo-sqlite";

export const getDb = async () => {
  let dbInstance = await SQLite.openDatabaseAsync("prodiaba.db");
  return dbInstance;
};
