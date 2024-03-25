// userStore.js
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useDataBaseStore } from "./database";

export const useUserStore = defineStore("userStore", () => {
  const router = useRouter();
  const userData = ref(null);
  const loadingUser = ref(false);
  const loadingSession = ref(false);

  const register = async (email, password) => {
    loadingUser.value = true;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      userData.value = { email: user.email, uid: user.uid };
      router.push({ name: "home" });
    } catch (error) {
      console.error("Error during registration:", error);
    } finally {
      loadingUser.value = false;
    }
  };

  const login = async (email, password) => {
    loadingUser.value = true;
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      userData.value = { email: user.email, uid: user.uid };
      router.push({ name: "home" });
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      loadingUser.value = false;
    }
  };

  const logoutUser = async () => {
    const dataBaseStore = useDataBaseStore();
    dataBaseStore.$reset();
    try {
      await signOut(auth);
      userData.value = null;
      console.log("Logout successful!");
      router.push({ name: "login" });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const currentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (user) => {
          if (user) {
            userData.value = { email: user.email, uid: user.uid };
          } else {
            userData.value = null;
            const databaseStore = useDataBaseStore();
            databaseStore.$reset();
          }
          resolve(user);
        },
        (error) => {
          console.error("Error during authentication:", error);
          reject(error);
        }
      );
    });
  };

  return {
    userData,
    register,
    login,
    logoutUser,
    loadingUser,
    currentUser,
    loadingSession,
  };
});
