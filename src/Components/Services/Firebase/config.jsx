import { initializeApp } from "firebase/app";
import {
  deleteUser,
  EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { getDatabase, ref, remove, update } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCisIT6YZ2U91dZusscxTduDX73iKe3Hgw",
  authDomain: "kindplanet-2023.firebaseapp.com",
  databaseURL: "https://kindplanet-2023-default-rtdb.firebaseio.com",
  projectId: "kindplanet-2023",
  storageBucket: "kindplanet-2023.appspot.com",
  messagingSenderId: "636688233453",
  appId: "1:636688233453:web:c93f062ed06c3f2e7c2de4",
  measurementId: "G-CPJXGC7GMV",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

console.log(auth);

const deleteSignedUser = async (afterdel) => {
  const userId = auth?.currentUser?.uid;
  let provider = localStorage.getItem("provider");
  if (provider == "emailpass") {
    const credential = EmailAuthProvider.credential(
      // auth.currentUser.email,
      localStorage.getItem("email"),
      localStorage.getItem("pass")
    );

    const result = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );

    // Pass result.user
    update(ref(db, "User/" + userId), {
      email: "",
      username: "",
    });
    //
    await deleteUser(result.user)
      .then(() => {
        afterdel();
        localStorage.removeItem("email");
        localStorage.removeItem("pass");
        localStorage.removeItem("provider");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    remove(ref(db, "User/" + userId));

    afterdel();
  }
  // console.log("success in deleting")
};

export { auth, provider, db, app, storage, deleteSignedUser };
