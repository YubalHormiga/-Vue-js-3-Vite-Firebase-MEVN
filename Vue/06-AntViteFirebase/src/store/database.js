import { ref } from "vue";
import { auth, db } from "../firebaseConfig";
import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import router from "../router/router";

export const useDataBaseStore = defineStore("database", () => {
  const documents = ref([]);
  const loadingDoc = ref(false);

  const getUrls = async () => {
    loadingDoc.value = true;
    // if (documents.value.length !== 0) {
    //   return;
    // }
    documents.value = [];
    try {
      const q = query(
        collection(db, "urls"),
        where("user", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, doc.data());
        documents.value.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      loadingDoc.value = false;
    }
  };

  const addUrl = async (name) => {
    try {
      const objectDocs = {
        name: name, /// ese el nombre que le hemos puesto
        short: nanoid(), // para añadir un id
        user: auth.currentUser.uid,
      };
      const docRef = await addDoc(collection(db, "urls"), objectDocs);
      documents.value.push({
        ...objectDocs,
        id: docRef.id,
      });
      // console.log("Document written : ", docRef.id);
    } catch (error) {
      log(error);
    } finally {
    }
  };

  const leerUrl = async (id) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("no existe el doc");
      }

      if (docSnap.data().user === auth.currentUser.uid) {
        return docSnap.data().name;
        // return {
        //   url: docSnap.data().name,
        // };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUrl = async (id, name) => {
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        throw new Error("no existe el doc");
      }

      if (docSnap.data().user === auth.currentUser.uid) {
        await updateDoc(docRef, {
          name: name,
        });
      }
      documents.value = documents.value.map((item) =>
        item.id === id ? { ...item, name: name } : item
      );
      router.push({ name: "home" });
    } catch (error) {
      console.log(error.messagejuan);
    } finally {
    }
  };
  const deleteUrl = async (id) => {
    loadingDoc.value = true;
    try {
      const docRef = doc(db, "urls", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("no existe el doc");
      }

      if (docSnap.data().user === auth.currentUser.uid) {
        await deleteDoc(docRef);
        documents.value = documents.value.filter((item) => item.id !== id);
      } else {
        throw new Error("no eres el autor");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      loadingDoc.value = false;
    }
  };
  // Implementa el método $reset()
  const $reset = () => {
    documents.value = [];
    loadingDoc.value = false;
  };

  return { documents, getUrls, loadingDoc, $reset, addUrl, leerUrl, deleteUrl,updateUrl };
});
