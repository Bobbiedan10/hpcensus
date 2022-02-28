import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import Router from "next/router";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log("online");
    }
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    console.log("online");
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
      console.log("initialized");
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

  async getCollectionByCondition(collection, field, condition, value) {
    let list = [];
    let db = firebase
      .firestore()
      .collection(collection)
      .where(field, condition, value);

    await db.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
    });

    return list;
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
    enum_parish,
    status,
    contract,
    oath,
    enumId,
    transport,
    tablet,
    mass_ed,
  }) {
    if (this.auth.currentUser) {
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
            enum_parish: enum_parish,
            status: status,
            contract: contract,
            oath: oath,
            id: enumId,
            transport: transport,
            tablet: tablet,
            mass_ed: firebase.firestore.FieldValue.arrayUnion(mass_ed),
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
    enumerating,
    ed,
    enum_parish,
    status,
    contract,
    oath,
    enumId,
    transport,
    tablet,
    mass_ed,
  }) {
    if (this.auth.currentUser) {
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
            enumerating: enumerating,
            ed: firebase.firestore.FieldValue.arrayUnion(ed),
            enum_parish: enum_parish,
            status: status,
            contract: contract,
            oath: oath,
            id: enumId,
            transport: transport,
            tablet: tablet,
            mass_ed: firebase.firestore.FieldValue.arrayUnion(mass_ed),
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
  }

  async addSenior({ name, address, phone, email, role, status, tablet }) {
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
          tablet: tablet,
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
      enum_parish,
      status,
      contract,
      oath,
      enumId,
      transport,
      tablet,
      mass_ed,
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
          enum_parish: enum_parish,
          status: status,
          contract: contract,
          oath: oath,
          id: enumId,
          transport: transport,
          tablet: tablet,
          mass_ed: firebase.firestore.FieldValue.arrayUnion(mass_ed),

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
