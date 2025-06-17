import { getDatabase, push, ref, set } from "firebase/database";
import { db } from "../../Database/firebase.config";

export const setFirebaseData = async (dbName, data) => {
  try {
    await set(ref(db, dbName), data);
  } catch (error) {
    throw new Error(`Upload Firebase Failed: ${error.message}`);
  }
};
