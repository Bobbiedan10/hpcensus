import Link from "next/link";
import { useForm } from "react-hook-form";
import DeviceMobileIcon from "../icons/device-mobile-icon";
import LocationIcon from "../icons/location-icon";
import EnvelopeIcon from "../icons/mail-icon";
import UserIcon from "../icons/user-icon";
import StatusIcon from "../icons/status-icon";
import firebase from "../../firebase/firebase";
import "firebase/compat/firestore";
function SeniorForm(props) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function back() {
    window.history.back();
  }
  return (
    <div className=''>
      <div className='flex items-center justify-between px-2 lg:px-4 py-2 text-2xl bg-yellow-500 text-white font-bold'>
        <h1>Senior Supervisor Form</h1>
      </div>
      <form className='grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 space-y-2'>
        <div className='bg-blue-600 text-white sm:col-span-4 lg:col-span-6 border-b py-2 px-4'>
          <h1 className='font-bold'>Basic Information</h1>
        </div>
        {/*NAME FIELD*/}
        <div className='px-4 sm:col-span-2 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label className='dark:text-gray-300' htmlFor='Name' title='Name'>
              <UserIcon />
            </label>
            <input
              name='name'
              type='text'
              placeholder='Name'
              {...register("name", {
                required: {
                  value: true,
                  message: "Missing senior's name",
                },
                pattern: {
                  value: /^[a-zA-Z\s-]*$/g,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.name?.message}
          </div>
        </div>
        {/*ADDRESS FIELD*/}
        <div className='px-4 sm:col-span-2 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300'
              htmlFor='Address'
              title='Address'>
              <LocationIcon />
            </label>
            <input
              name='address'
              type='text'
              placeholder='Address'
              {...register("address", {
                required: {
                  value: true,
                  message: "Enter senior's address",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.address?.message}
          </div>
        </div>
        {/*PHONE FIELD*/}
        <div className='px-4 sm:col-span-2  lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label className='dark:text-gray-300' htmlFor='Phone' title='Phone'>
              <DeviceMobileIcon />
            </label>
            <input
              name='phone'
              type='text'
              placeholder='123-4576'
              {...register("phone", {
                required: {
                  value: true,
                  message: "Enter senior's phone number.",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.phone?.message}
          </div>
        </div>
        {/*EMAIL FIELD*/}
        <div className='px-4 sm:col-span-2 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label className='dark:text-gray-300' htmlFor='Email' title='Email'>
              <EnvelopeIcon />
            </label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              {...register("email", {
                required: {
                  value: false,
                  message: "Missing senior's email address",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email Invalid",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.email?.message}
          </div>
        </div>

        <div className='bg-blue-600 text-white sm:col-span-4 lg:col-span-6 border-b border-t py-2 px-4'>
          <h1 className='font-bold'>Census Information</h1>
        </div>
        {/*ROLE FIELD*/}
        <div className='hidden'>
          <input
            name='role'
            type='hidden'
            value='Senior-supervisor'
            {...register("role", {})}
          />
        </div>

        {/*STATUS*/}
        <div className='px-4 sm:col-span-2 lg:col-span-1'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Status'
              title='Status'>
              <StatusIcon />
            </label>
            <select
              name='status'
              {...register("status", {
                required: {
                  value: true,
                  message: "Select status",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value=''>Choose Status</option>
              <option value='Active'>Active</option>
              <option value='Reserved'>Reserved</option>
              <option value='Quarantined'>Quarantined</option>
              <option value='Sick'>Sick</option>
              <option value='Resigned'>Resigned</option>
            </select>
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.status?.message}
          </div>
        </div>
        {/*TABLET ID*/}
        <div className='px-4 flex gap-1 sm:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Tablet'
              title='Tablet Serial Code'>
              <DeviceMobileIcon />
            </label>
            <input
              name='tablet'
              type='text'
              maxLength={11}
              placeholder='R9WR20HEF6J'
              {...register("tablet", {
                required: {
                  value: false,
                },
                pattern: {
                  value: /^[0-9A-Z]+/g,
                  message: "Please enter tablet serial code.",
                },
                maxLength: {
                  value: 11,
                  message: "Serial codes are 11 digits long",
                },
                minLength: {
                  value: 11,
                  message: "Serial codes are 11 digits long",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
            <div className='text-red-500 font-medium'>
              {errors?.ed?.message}
            </div>
          </div>
        </div>
        {/*SUBMIT*/}
        <div className='px-3 py-2 sm:col-span-4 lg:col-span-6 border-t'>
          <div className='flex items-center gap-2 '>
            <input
              onClick={handleSubmit(async () => {
                try {
                  await firebase.addSenior(getValues());
                } catch (error) {
                  console.log(error);
                }
              })}
              type='submit'
              value='Add'
              className='py-2 px-4 cursor-pointer text-white rounded-lg bg-green-500'
            />
            <Link href=''>
              <a
                onClick={back}
                className='py-2 px-4 text-white rounded-lg bg-red-600'>
                Cancel
              </a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SeniorForm;
