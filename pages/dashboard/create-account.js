import { useForm } from "react-hook-form";
import firebase from "../../firebase/firebase";
import "firebase/compat/auth";
import Router from "next/router";
import UserIcon from "../../components/icons/user-icon";
import EnvelopeIcon from "../../components/icons/mail-icon";
import KeyIcon from "../../components/icons/key-icon";
import Link from "next/link";
import ToggleSwitch from "../../components/ui/toggle-switch";

export default function CreateUser() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <div className='flex h-screen justify-center items-center'>
      <div className='max-w-7xl'>
        <div className='flex items-center justify_center'>
          <form
            name='login'
            className='dark:bg-gray-600  dark:text-gray-100 border w-80 lg:w-96 mx-auto rounded-lg shadow-lg dark:shadow-blue-600 p-4 flex flex-col space-y-4'>
            <div className='hidden md:flex justify-center items-center'>
              <img src='/img/logo.png' alt='logo' className='w-2/4' />
            </div>
            <h1 className='text-center font-bold text-xl '>Create User</h1>
            <div className='space-y-2 flex flex-col'>
              <div className='flex items-center gap-2'>
                <label title='Name' className=''>
                  <UserIcon />
                </label>
                <input
                  name='name'
                  type='text'
                  placeholder='Name'
                  {...register("name", {
                    required: {
                      value: true,
                      message: "You must enter your name",
                    },
                  })}
                  className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                    errors.name ? "border-red-500" : null
                  }`}
                />
              </div>
              <div className='text-red-500 font-medium'>
                {errors?.name?.message}
              </div>
            </div>
            <div className='space-y-2 flex flex-col'>
              <div className='flex items-center gap-2'>
                <label title='Email' className=''>
                  <EnvelopeIcon />
                </label>
                <input
                  name='email'
                  placeholder='JDoe@barstats.gov.bb'
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Enter your organization email!",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@barstats.gov.bb/i,
                      message: "Email must have organization suffix",
                    },
                  })}
                  className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
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
                <label title='Password' className=''>
                  <KeyIcon />
                </label>
                <input
                  name='pass'
                  className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                    errors.name ? "border-red-500" : null
                  }`}
                  placeholder='New Password'
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
            <div className='flex flex-col gap-y-2'>
              <button
                type='submit'
                className='w-full text-center py-2 rounded-lg transition ease-in-out duration-150 dark:hover:bg-blue-900 dark:bg-blue-800 bg-blue-500 text-white'
                onClick={handleSubmit(async () => {
                  try {
                    await firebase.register(getValues());

                    Router.push("/dashboard/profile");
                  } catch (error) {
                    // if error
                    console.log(error);
                  }
                  //   try {
                  //     await firebase.login(getValues());

                  //     Router.push("/dashboard/");
                  //   } catch (error) {
                  //     console.log(error);
                  //   }
                })}>
                Create Account
              </button>
              <Link href='/dashboard/profile'>
                <a className='w-full text-center py-2 rounded-lg bg-red-600 text-white'>
                  Cancel
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToggleSwitch />
    </div>
  );
}
