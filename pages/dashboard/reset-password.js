import { useForm } from "react-hook-form";
import firebase from "../../firebase/firebase";
import Link from "next/link";
import Router from "next/router";
import KeyIcon from "../../components/icons/key-icon";
function ResetPassword() {
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
        <div className='flex items-center'>
          <form
            name='login'
            className='dark:bg-gray-600  dark:text-gray-200 border w-80 lg:w-96 mx-auto rounded-lg shadow-md p-4 flex flex-col space-y-4'>
            <h1 className='text-center font-bold text-xl '>Reset Password</h1>

            <div className='space-y-2 flex flex-col'>
              <div className='flex items-center gap-2'>
                <label title='Password' className=''>
                  <KeyIcon />
                </label>
                <input
                  name='pass'
                  className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                    errors.name ? "border-red-500" : null
                  }`}
                  type='password'
                  placeholder='New Password'
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
                    await firebase.resetPassword(getValues("pass"));

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
                Reset Password
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
    </div>
  );
}

export default ResetPassword;
