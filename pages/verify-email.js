import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import firebase from "../firebase/firebase";
import "firebase/compat/auth";
import ArrowRightIcon from "../components/icons/arrow-right-icon";
function VerifyEmail() {
  const logout = firebase.logout();
  const sendEmail = firebase;

  useEffect(() => {
    if (!firebase.isLoggedIn()) {
      Router.push("/");
    }
    if (firebase.isVerified()) {
      Router.push("/dashboard/");
    }
  }, []);

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='max-w-7xl'>
        <div className='flex items-center'>
          <div className='border w-80 lg:w-96 mx-auto rounded-lg shadow-md p-4 flex flex-col space-y-4'>
            <div className='hidden md:flex justify-center items-center'>
              <img src='img/logo.png' alt='logo' className='w-2/4' />
            </div>
            <h1>
              You are not verified. To proceed to Dashboard please check your
              email for verification link.
            </h1>

            <Link href='/'>
              <a
                className='py-2 px-2 bg-green-500 rounded text-white flex gap-2'
                onClick={sendEmail.sendVerification()}>
                Go to Login <ArrowRightIcon />
              </a>
            </Link>

            <button
              className='py-2 px-2 bg-red-500 rounded text-white'
              onClick={() => {
                logout;
                Router.push("/");
              }}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  //   } else {
  //     return (
  //       <div className='flex h-screen justify-center items-center'>
  //         <div className='max-w-7xl'>
  //           <div className='flex items-center'>
  //             <div className='border w-80 lg:w-96 mx-auto rounded-lg shadow-md p-4 flex flex-col space-y-4'>
  //               <h1>Email Sent.</h1>
  //               <button
  //                 onClick={() => {
  //                   setClicked(true);
  //                 }}
  //                 className='py-2 px-2 bg-green-500 rounded text-white'>
  //                 {clicked ? "Email Sent" : "Send Verification Email"}
  //               </button>
  //               <button
  //                 className='py-2 px-2 bg-red-500 rounded text-white'
  //                 onClick={() => {
  //                   firebase.logout();
  //                   Router.push("/");
  //                 }}>
  //                 Logout
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
}

export default VerifyEmail;
