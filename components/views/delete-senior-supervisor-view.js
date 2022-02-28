import Link from "next/link";
import { useForm } from "react-hook-form";
import DeviceMobileIcon from "../icons/device-mobile-icon";
import LocationIcon from "../icons/location-icon";
import EnvelopeIcon from "../icons/mail-icon";
import UserIcon from "../icons/user-icon";
import StatusIcon from "../icons/status-icon";
import firebase from "../../firebase/firebase";
import "firebase/compat/firestore";
function DeleteSeniorView(props) {
  const { identity } = props;
  let iden;
  if (identity) {
    iden = JSON.parse(identity);
  }
  const { handleSubmit } = useForm();

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
              <input readOnly
                name='name'
                type='text'
                value={id.docData.name}
                placeholder='Name'
                className={`bg-gray-100 text-gray-300 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full`}
              />
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
              <input readOnly
                name='address'
                type='text'
                placeholder='Address'
                value={id.docData.address}
                className={`bg-gray-100 text-gray-300 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full `}
              />
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
              <input readOnly
                name='phone'
                type='text'
                value={id.docData.phone}
                placeholder='123-4576'
                className={`bg-gray-100 text-gray-300 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full`}
              />
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
              <input readOnly
                name='email'
                type='text'
                placeholder='Email'
                value={id.docData.email}
                className={`bg-gray-100 text-gray-300 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full`}
              />
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
                className={`bg-gray-100 text-gray-300 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full `}>
                <option value={id.docData.status}>{id.docData.status}</option>
                <option value=''>Choose Status</option>
                <option value='Active'>Active</option>
                <option value='Quarantined'>Quarantined</option>
                <option value='Sick'>Sick</option>
                <option value='Resigned'>Resigned</option>
              </select>
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
              <input readOnly
                name='tablet'
                type='text'
                maxLength={11}
                value={id.docData.tablet}
                placeholder='R9WR20HEF6J'
                className={`bg-gray-100 text-gray-300 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700  border w-full `}
              />
            </div>
          </div>
          {/*SUBMIT*/}
          <div className='px-3 py-2 sm:col-span-2 lg:col-span-6 border-t'>
            <div className='flex items-center gap-2 '>
              <input readOnly
                onClick={handleSubmit(async () => {
                  try {
                    await firebase.deleteSenior(props.id);
                  } catch (error) {
                    console.log(error);
                  }
                })}
                type='submit'
                value='Delete'
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

export default DeleteSeniorView;
