import { useForm } from "react-hook-form";
import firebase from "../firebase/firebase";
import "firebase/compat/auth";
import { useEffect } from "react";
import Router from "next/router";
import KeyIcon from "../components/icons/key-icon";
import EnvelopeIcon from "../components/icons/mail-icon";
import ToggleSwitch from "../components/ui/toggle-switch";

export default function Login() {
  useEffect(() => {
    if (firebase.isLoggedIn()) {
      Router.push("/dashboard/");
    }
  }, []);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className='flex dark:bg-gray-900 h-screen justify-center items-center'>
      <div className='grid  lg:grid-cols-2 max-w-7xl p-4'>
        <div className='hidden md:flex justify-center items-center'>
          <img src='img/logo.png' alt='logo' className='w-3/4' />
        </div>
        <div className='flex items-center'>
          <form
            name='login'
            className='border dark:bg-gray-600 md:w-2/3 mx-auto rounded-lg shadow-md p-4 flex flex-col space-y-4'>
            <img
              src='img/logo.png'
              alt='logo'
              className='md:hidden w-2/4 mx-auto'
            />
            <h1 className='text-center font-bold text-xl dark:text-gray-300 '>
              Welcome to the Census
              <br /> Field Management System
            </h1>
            <div className='space-y-2 flex flex-col'>
              <div className='flex items-center gap-2'>
                <label title='Email' className='dark:text-gray-300'>
                  <EnvelopeIcon />
                </label>
                <input
                  name='email'
                  placeholder='Email'
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Enter your organization email!",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email must have organization suffix",
                    },
                  })}
                  className={`bg-gray-100 p-2 rounded-lg border dark:bg-gray-400 dark:placeholder:text-gray-700 w-full ${
                    errors.name ? "border-red-500" : null
                  }`}
                  type='text'
                />
              </div>
              <div className='text-red-500 font-medium'>
                {errors?.email?.message}
              </div>
            </div>
            <div className='space-y-2 flex flex-col'>
              <div className='flex items-center gap-2'>
                <label title='Password' className='dark:text-gray-300'>
                  <KeyIcon />
                </label>
                <input
                  name='pass'
                  placeholder='Password'
                  className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                    errors.name ? "border-red-500" : null
                  }`}
                  type='password'
                  {...register("pass", {
                    required: {
                      value: true,
                      message: "You must enter your password",
                    },
                  })}
                />
              </div>
              <div className='text-red-500 font-medium'>
                {errors?.pass?.message}
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='w-full text-center py-2 rounded-lg transistion ease-in-out duration-150 dark:bg-blue-800 dark:hover:bg-blue-900 bg-blue-500 text-white'
                onClick={handleSubmit(async () => {
                  try {
                    await firebase.login(getValues());

                    Router.push("/dashboard/");
                  } catch (error) {
                    console.log(error);
                  }
                })}
                // async () => {
                //   await firebase
                //     .auth()
                //     .signInWithEmailAndPassword(
                //       getValues("email"),
                //       getValues("pass")
                //     )
                //     .then(function () {
                //       window.location.href = "/census/authenticate";
                //     })
                //     .catch(function (error) {
                //       //                      const message = error.message;
                //       console.log(error);
                //     });
                // })}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToggleSwitch />
    </div>
  );
}
