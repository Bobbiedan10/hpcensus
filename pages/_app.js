import "../styles/globals.css";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import firebase from "../firebase/firebase";

function MyApp({ Component, pageProps }) {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(async () => {
    await firebase.isInitialized();
    setFirebaseInitialized(true);
  }, []);

  return (
    <>
      {!firebaseInitialized ? (
        <div className='h-screen dark:bg-gray-900 flex justify-center items-center '>
          <div className='flex space-x-2 animate-spin'>
            <div className='rounded-full p-4 bg-blue-600  duration-100 shadow-lg'></div>
            <div className='rounded-full p-4 bg-pink-600  duration-150 shadow-lg'></div>
            <div className='rounded-full p-4 bg-orange-600 delay-200 shadow-lg'></div>
          </div>
        </div>
      ) : (
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </>
  );
}

export default MyApp;
