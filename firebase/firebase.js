import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Router from "next/router";

const firebaseConfig = {
  apiKey: "AIzaSyDzExL2WYyl34E2ml8LPYuQ3ZZ4Ls4zuNY",
  authDomain: "census2021-2022.firebaseapp.com",
  databaseURL: "https://census2021-2022-default-rtdb.firebaseio.com",
  projectId: "census2021-2022",
  storageBucket: "census2021-2022.appspot.com",
  messagingSenderId: "316664629063",
  appId: "1:316664629063:web:a23206e2dffd483415ae62",
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  async login({ email, pass }) {
    return await this.auth.signInWithEmailAndPassword(email, pass);
  }

  async logout() {
    return await this.auth.signOut();
  }

  async register({ name, email, pass }) {
    await this.auth.createUserWithEmailAndPassword(email, pass);
    await this.auth.currentUser.sendEmailVerification();
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  isLoggedIn() {
    let sessionTimeout = null;
    if (this.auth.currentUser) {
      this.auth.currentUser.getIdTokenResult().then((idTokenResult) => {
        const authTime = idTokenResult.claims.auth_time * 1000;
        const sessionDuration = 1000 * 60 * 60 * 2;
        const milliscondsUntilExpiration =
          sessionDuration - (Date.now() - authTime);
        sessionTimeout = setTimeout(
          () => this.auth.signOut(),
          milliscondsUntilExpiration
        );
      });
      return true;
    } else {
      sessionTimeout && clearTimeout(sessionTimeout);
      sessionTimeout = null;
      return false;
    }
  }

  isVerified() {
    if (this.auth.currentUser) {
      if (this.auth.currentUser.emailVerified) return true;
      else return false;
    } else {
      return false;
    }
  }

  getProfile() {
    if (this.auth.currentUser) {
      return {
        name: this.auth.currentUser.displayName,
        email: this.auth.currentUser.email,
        verified: this.auth.currentUser.emailVerified,
      };
    } else {
      return {
        name: null,
        email: null,
      };
    }
  }

  async sendVerification() {
    try {
      if (this.auth.currentUser) {
        await this.auth.currentUser.sendEmailVerification();
        return true;
      } else {
        throw "";
      }
    } catch (error) {
      return false;
    }
  }

  async resetPassword(pass) {
    try {
      if (this.auth.currentUser) {
        await this.auth.currentUser.updatePassword(pass);
        return true;
      } else {
        throw "";
      }
    } catch (error) {
      return false;
    }
  }

  async getCountByCondition(collection, field, condition, value) {
    let count = 0;
    let db = firebase
      .firestore()
      .collection(collection)
      .where(field, condition, value);

    await db.get().then((querySnapshot) => {
      querySnapshot.forEach(() => {
        count++;
      });
    });

    return count;
  }

  async getCollection(collection) {
    let data = [];
    let db = firebase.firestore().collection(collection);
    await db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          docData: doc.data(),
        });
      });
    });
    return data;
  }

  async getDocument(collection, docId) {
    let document = [];
    let db = firebase.firestore().collection(collection).doc(docId);
    await db
      .get()
      .then((doc) => {
        if (doc.exists) {
          document.push({ docData: doc.data() });
        } else {
          console.log("No such document");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return document;
  }

  async addEnumerator({
    name,
    address,
    phone,
    email,
    nid,
    nis,
    tin,
    bank,
    branch,
    account,
    role,
    senior,
    supervisor,
    ed,
    status,
    contract,
    oath,
    enumId,
    transport,
  }) {
    try {
      await firebase
        .firestore()
        .collection("enumerators")
        .add({
          name: name,
          address: address,
          phone: phone,
          email: email,
          nid: nid,
          banking: {
            nis: nis,
            tin: tin,
            bank: bank,
            branch: branch,
            account: account,
          },
          role: role,
          senior: senior,
          supervisor: supervisor,
          ed: firebase.firestore.FieldValue.arrayUnion(ed),
          status: status,
          contract: contract,
          oath: oath,
          id: enumId,
          transport: transport,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Router.push("/dashboard/enumerators");
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addSupervisor({
    name,
    address,
    phone,
    email,
    nid,
    nis,
    tin,
    bank,
    branch,
    account,
    role,
    senior,
    status,
    contract,
    oath,
    enumId,
    transport,
  }) {
    try {
      await firebase
        .firestore()
        .collection("supervisors")
        .add({
          name: name,
          address: address,
          phone: phone,
          email: email,
          nid: nid,
          banking: {
            nis: nis,
            tin: tin,
            bank: bank,
            branch: branch,
            account: account,
          },
          role: role,
          senior: senior,
          status: status,
          contract: contract,
          oath: oath,
          id: enumId,
          transport: transport,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Router.push("/dashboard/supervisors");
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addSenior({ name, address, phone, email, role, status }) {
    try {
      await firebase
        .firestore()
        .collection("senior-supervisors")
        .add({
          name: name,
          address: address,
          phone: phone,
          email: email,
          role: role,
          status: status,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Router.push("/dashboard/senior-supervisors");
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateEnumerator(
    id,
    {
      name,
      address,
      phone,
      email,
      nid,
      nis,
      tin,
      bank,
      branch,
      account,
      role,
      senior,
      supervisor,
      ed,
      status,
      contract,
      oath,
      enumId,
      transport,
      tablet,
    }
  ) {
    try {
      await firebase
        .firestore()
        .collection("enumerators")
        .doc(id)
        .update({
          name: name,
          address: address,
          phone: phone,
          email: email,
          nid: nid,
          banking: {
            nis: nis,
            tin: tin,
            bank: bank,
            branch: branch,
            account: account,
          },
          role: role,
          senior: senior,
          supervisor: supervisor,
          ed: firebase.firestore.FieldValue.arrayUnion(ed),
          status: status,
          contract: contract,
          oath: oath,
          id: enumId,
          transport: transport,
          tablet: tablet,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Router.push("/dashboard/enumerators");
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateSupervisor(
    id,
    {
      name,
      address,
      phone,
      email,
      nid,
      nis,
      tin,
      bank,
      branch,
      account,
      role,
      senior,
      ed,
      status,
      contract,
      oath,
      enumId,
      transport,
      tablet,
    }
  ) {
    try {
      await firebase
        .firestore()
        .collection("supervisors")
        .doc(id)
        .update({
          name: name,
          address: address,
          phone: phone,
          email: email,
          nid: nid,
          banking: {
            nis: nis,
            tin: tin,
            bank: bank,
            branch: branch,
            account: account,
          },
          role: role,
          senior: senior,
          ed: firebase.firestore.FieldValue.arrayUnion(ed),
          status: status,
          contract: contract,
          oath: oath,
          id: enumId,
          transport: transport,
          tablet: tablet,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Router.push("/dashboard/supervisors");
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async updateSenior(
    id,
    { name, address, phone, email, role, status, tablet }
  ) {
    try {
      await firebase
        .firestore()
        .collection("senior-supervisors")
        .doc(id)
        .update({
          name: name,
          address: address,
          phone: phone,
          email: email,
          status: status,
          tabletId: tablet,
          // time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          Router.push("/dashboard/senior-supervisors");
        });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deleteEnumerator(id) {
    try {
      await firebase
        .firestore()
        .collection("enumerators")
        .doc(id)
        .delete()
        .then(() => {
          Router.push("/dashboard/enumerators");
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSupervisor(id) {
    try {
      await firebase
        .firestore()
        .collection("supervisors")
        .doc(id)
        .delete()
        .then(() => {
          Router.push("/dashboard/supervisors");
        });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteSenior(id) {
    try {
      await firebase
        .firestore()
        .collection("senior-supervisors")
        .doc(id)
        .delete()
        .then(() => {
          Router.push("/dashboard/senior-supervisors");
        });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Firebase();
