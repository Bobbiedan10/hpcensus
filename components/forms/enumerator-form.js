import Link from "next/link";
import { useForm } from "react-hook-form";
import BuildingIcon from "../icons/building-icon";
import DeviceMobileIcon from "../icons/device-mobile-icon";
import IdentityIcon from "../icons/identification-icon";
import LocationIcon from "../icons/location-icon";
import EnvelopeIcon from "../icons/mail-icon";
import ShieldCheckIcon from "../icons/shield-check-icon";
import TaxIcon from "../icons/tax-icon";
import UserIcon from "../icons/user-icon";
import ShareIcon from "../icons/share-icon";
import HashtagIcon from "../icons/hashtag-icon";
import ClipboardIcon from "../icons/clipboard-icon";
import MapIcon from "../icons/map-icon";
import UserRole from "../icons/user-role";
import TrendingIcon from "../icons/trending-icon";
import StatusIcon from "../icons/status-icon";
import firebase from "../../firebase/firebase";
import "firebase/compat/firestore";
import { useRouter } from "next/router";
function EnumeratorForm(props) {
  const { seniors, supes } = props;
  let supervisor = JSON.parse(supes);
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    reValidateMode: "onChange",
  });
  function back() {
    window.history.back();
  }
  return (
    <div className=''>
      <div className='flex items-center justify-between px-2 lg:px-4 py-2 text-2xl bg-pink-600 text-white font-bold'>
        <h1>Enumerator Form</h1>
      </div>

      <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 space-y-2'>
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
              placeholder='Name'
              {...register("name", {
                required: {
                  value: false,
                  message: "Missing enumerator's name",
                },
                pattern: {
                  value: /^[a-zA-Z\s-]*$/g,
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
              {...register("address", {
                required: {
                  value: false,
                  message: "Missing enumerator's address",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
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
            <label className='dark:text-gray-300' htmlFor='Phone' title='Phone'>
              <DeviceMobileIcon />
            </label>
            <input
              name='phone'
              type='text'
              placeholder='123-4576'
              {...register("phone", {
                required: {
                  value: false,
                  message: "Missing enumerator's phone number.",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
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
                  message: "Missing enumerator's email address",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Email Invalid",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.email?.message}
          </div>
        </div>
        {/*NATIONAL ID FIELD*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300'
              htmlFor='National ID'
              title='National ID'>
              <IdentityIcon />
            </label>
            <input
              name='nid'
              type='text'
              placeholder='National ID #'
              {...register("nid", {
                required: {
                  value: false,
                  message: "Enter enumerator's national ID",
                },
                pattern: {
                  value: /^[0-9]{6}-[0-9]{4}/g,
                  message: "Incorrect format. 000000-0000",
                },
                maxLength: {
                  value: 11,
                  message: "ID must be 11 characters length",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>{errors?.nid?.message}</div>
        </div>
        <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b border-t py-2 px-4'>
          <h1 className='font-bold'>Banking Information</h1>
        </div>
        {/*NATIONAL INSURANCE FIELD*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              htmlFor='National Insurance'
              title='National Insurance'
              className='dark:text-gray-300'>
              <ShieldCheckIcon />
            </label>
            <input
              name='nis'
              type='text'
              placeholder='NIS #'
              {...register("nis", {
                required: {
                  value: false,
                },
                pattern: {
                  value: /^[0-9]{6}$/g,
                  message: "NIS# must be 6 digits",
                },
              })}
              className={`bg-gray-100  p-2 rounded-lg border dark:bg-gray-400 dark:placeholder:text-gray-700 w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>{errors?.nis?.message}</div>
        </div>
        {/*TAX IDENTIFICATION NUMBER*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              htmlFor='Tax Identification Number'
              title='Tax Identification Number'
              className='dark:text-gray-300'>
              <TaxIcon />
            </label>
            <input
              name='tin'
              type='text'
              placeholder='TIN #'
              {...register("tin", {
                required: {
                  value: false,
                },
                pattern: {
                  value: /^[1]{1}[0-9]{12}$/g,
                  message: "TIN must be 13 digits ",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>{errors?.tin?.message}</div>
        </div>
        {/*BANK*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label htmlFor='Bank' title='Bank' className='dark:text-gray-300'>
              <BuildingIcon />
            </label>
            <input
              name='bank'
              type='text'
              placeholder='Bank'
              {...register("bank", {
                required: {
                  value: false,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.bank?.message}
          </div>
        </div>
        {/*BRANCH*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              htmlFor='Branch'
              title='Branch'
              className='dark:text-gray-300'>
              <ShareIcon />
            </label>
            <input
              name='branch'
              type='text'
              placeholder='Branch'
              {...register("branch", {
                required: {
                  value: false,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.branch?.message}
          </div>
        </div>
        {/*BANK ACCOUNT*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              htmlFor='Bank Account'
              title='Bank Account'
              className='dark:text-gray-300'>
              <HashtagIcon />
            </label>
            <input
              name='account'
              type='text'
              placeholder='Account #'
              {...register("account", {
                required: {
                  value: false,
                },
                pattern: {
                  value: /^\d+$/,
                  message: "Account number must be digits",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.branch?.message}
          </div>
        </div>

        <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b border-t py-2 px-4'>
          <h1 className='font-bold'>Census Information</h1>
        </div>
        {/*ROLE FIELD*/}
        <div className='hidden'>
          <input
            name='role'
            type='hidden'
            value='Enumerator'
            {...register("role", {})}
          />
        </div>
        {/*SENIORS*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Senior Supervisor'
              title='Senior Supervisor'>
              <UserRole />
            </label>
            <select
              name='senior'
              {...register("senior", {
                required: {
                  value: false,
                  message: "Select designated Senior",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value=''>Select Senior</option>
              {seniors.map((senior) => (
                <option key={senior.id} value={`${senior.docData.name}`}>
                  {senior.docData.name}
                </option>
              ))}
            </select>
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.senior?.message}
          </div>
        </div>
        {/*SUPERVISORS*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Supervisor'
              title='Supervisor'>
              <UserIcon />
            </label>
            <select
              name='supervisor'
              {...register("supervisor", {
                required: {
                  value: false,
                  message: "Select designated Supervisor",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value=''>Select Supervisor</option>
              {supervisor.map((supe) => (
                <option key={supe.id} value={supe.docData.name}>
                  {supe.docData.name}
                </option>
              ))}
            </select>
          </div>
          <div className='text-red-500 font-medium'>
            {errors?.senior?.message}
          </div>
        </div>
        {/*ED*/}
        <div className='px-4 lg:col-span-1'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='ED'
              title='ED'>
              <MapIcon />
            </label>
            <input
              name='ed'
              type='text'
              placeholder='ED#'
              {...register("ed", {
                required: {
                  value: false,
                },
                pattern: {
                  value: /^\d+$/,
                  message: "ED must be digits. e.g.(000)",
                },
                maxLength: {
                  value: 3,
                  message: "ED must be 3 digits",
                },
                minLength: {
                  value: 3,
                  message: "ED must be 3 digits",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
            <div className='text-red-500 font-medium'>
              {errors?.ed?.message}
            </div>
          </div>
        </div>
        {/*PARISH ENUMERATED */}
        <div className='px-4 flex lg:col-span-1'>
          <div className='flex items-center gap-2 w-full'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Parish enumerated'
              title='Parish enumerated'>
              <MapIcon />
            </label>
            <select
              name='enum_parish'
              {...register("enum_parish", {
                required: {
                  value: false,
                  message: "Select active parish",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value=''>Select Active Parish</option>
              <option value='Not Assigned'>Not Assigned</option>
              <option value='St. Michael'>St. Michael</option>
              <option value='Christ Church'>Christ Church</option>
              <option value='St. George'>St. George</option>
              <option value='St. Philip'>St. Philip</option>
              <option value='St. John'>St. John</option>
              <option value='St. James'>St. James</option>
              <option value='St. Thomas'>St. Thomas</option>
              <option value='St. Joseph'>St. Joseph</option>
              <option value='St. Andrew'>St. Andrew</option>
              <option value='St. Peter'>St. Peter</option>
              <option value='St. Lucy'>St. Lucy</option>
            </select>
          </div>
        </div>
        {/*STATUS*/}
        <div className='px-4 lg:col-span-1'>
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
                  value: false,
                  message: "Select status",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
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

        <div className='px-4 flex gap-1 lg:col-span-2'>
          {/*CONTRACT*/}
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Contract'
              title='Contract'>
              <ClipboardIcon /> Contract
            </label>
            <select
              name='contract'
              {...register("contract", {
                required: {
                  value: false,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </div>
          {/*OATH*/}
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Oath'
              title='Oath'>
              <ClipboardIcon /> Oath
            </label>
            <select
              name='oath'
              {...register("oath", {
                required: {
                  value: false,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </div>
        </div>
        <div className='px-4 flex gap-1 lg:col-span-2'>
          {/*ENUMERATOR ID */}
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor="Enumerator's ID"
              title="Enumerator's ID">
              <IdentityIcon /> ID
            </label>
            <select
              name='enumId'
              {...register("enumId", {
                required: {
                  value: false,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </div>
          {/*TRANSPORTATION */}
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='Transport'
              title='Transport'>
              <TrendingIcon /> Transportation
            </label>
            <select
              name='transport'
              {...register("transport", {
                required: {
                  value: false,
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}>
              <option value='No'>No</option>
              <option value='Yes'>Yes</option>
            </select>
          </div>
        </div>
        {/*TABLET ID*/}
        <div className='px-4 flex gap-1 lg:col-span-2'>
          <div className='flex items-center gap-2 w-full'>
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
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
                errors.name ? "border-red-500" : null
              }`}
            />
            <div className='text-red-500 font-medium'>
              {errors?.ed?.message}
            </div>
          </div>
        </div>

        <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b border-t py-2 px-4'>
          <h1 className='font-bold'>Mass Enumeration</h1>
        </div>
        {/*MASS ED*/}
        <div className='px-4 lg:col-span-2'>
          <div className='flex items-center gap-2'>
            <label
              className='dark:text-gray-300 flex font-bold'
              htmlFor='ED'
              title='ED'>
              <MapIcon />
            </label>
            <input
              name='mass_ed'
              type='text'
              placeholder='Mass enumeration ED#'
              {...register("mass_ed", {
                required: {
                  value: false,
                },
                pattern: {
                  value: /^\d+$/,
                  message: "ED must be digits. e.g.(000)",
                },
                maxLength: {
                  value: 3,
                  message: "ED must be 3 digits",
                },
                minLength: {
                  value: 3,
                  message: "ED must be 3 digits",
                },
              })}
              className={`bg-gray-100 p-2 rounded-lg dark:bg-gray-400 dark:placeholder:text-gray-700 border w-full ${
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
            <button
              onClick={handleSubmit(async () => {
                try {
                  await firebase.addEnumerator(getValues());
                } catch (error) {
                  console.log(error);
                }
              })}
              type='submit'
              className='py-2 px-4 text-white cursor-pointer rounded-lg bg-green-500'>
              Add
            </button>
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

export default EnumeratorForm;
