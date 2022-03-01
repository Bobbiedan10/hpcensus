import Link from "next/link";
import { useForm } from "react-hook-form";
import DeviceMobileIcon from "../icons/device-mobile-icon";
import LocationIcon from "../icons/location-icon";
import EnvelopeIcon from "../icons/mail-icon";
import UserIcon from "../icons/user-icon";
import StatusIcon from "../icons/status-icon";
import firebase from "../../firebase/firebase";
import "firebase/compat/firestore";
function EditSeniorForm(props) {
  const { identity } = props;
  let iden;
  if (identity) {
    iden = JSON.parse(identity);
  }
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
    <div>
      {iden.map((id, index) => (
        <form
          key={index}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 space-y-2'>
          <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b py-2 px-4'>
            <h1 className='font-bold'>Basic Information</h1>
          </div>
          {/*NAME FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label className='dark:text-gray-300' htmlFor='Name' title='Name'>
                <UserIcon />
              </label>
              <input
                name='name'
                type='text'
                defaultValue={id.docData.name}
                placeholder='Name'
                {...register("name", {
                  required: {
                    value: true,
                    message: "Missing Senior's name",
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
          <div className='px-4 lg:col-span-2'>
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
                defaultValue={id.docData.address}
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
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                className='dark:text-gray-300'
                htmlFor='Phone'
                title='Phone'>
                <DeviceMobileIcon />
              </label>
              <input
                name='phone'
                type='text'
                defaultValue={id.docData.phone}
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
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                className='dark:text-gray-300'
                htmlFor='Email'
                title='Email'>
                <EnvelopeIcon />
              </label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                defaultValue={id.docData.email}
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

          <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b border-t py-2 px-4'>
            <h1 className='font-bold'>Census Information</h1>
          </div>
          {/*STATUS*/}
          <div className='px-4 py-2 lg:col-span-1'>
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
                <option defaultValue={id.docData.status}>
                  {id.docData.status}
                </option>
                <option value=''>Choose Status</option>
                <option value='Active'>Active</option>
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
          <div className='px-4 flex gap-1 lg:col-span-2'>
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
                defaultValue={id.docData.tablet}
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
          <div className='px-3 py-2 sm:col-span-2 lg:col-span-6 border-t'>
            <div className='flex items-center gap-2 '>
              <input
                onClick={handleSubmit(async () => {
                  try {
                    await firebase.updateSenior(props.id, getValues());
                  } catch (error) {
                    console.log(error);
                  }
                })}
                type='submit'
                value='Update'
                className='py-2 px-4 text-white rounded-lg bg-green-500'
              />
              <Link href='/dashboard/senior-supervisors'>
                <a className='py-2 px-4 text-white rounded-lg bg-red-600'>
                  Cancel
                </a>
              </Link>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
}

export default EditSeniorForm;
