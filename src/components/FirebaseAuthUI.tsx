import { useEffect } from 'react';
import { auth } from '../lib/firebase';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';

const FirebaseAuthUI = () => {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          // Avoid redirects after sign-in.
          return false;
        },
      },
    });

    return () => ui.delete();
  }, []);

  return <div id="firebaseui-auth-container" />;
};

export default FirebaseAuthUI;