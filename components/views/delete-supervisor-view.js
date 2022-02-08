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
import TemplateIcon from "../icons/template-icon";
import firebase from "../../firebase/firebase";
import "firebase/compat/firestore";
function DeleteSupervisorView(props) {
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
              <label htmlFor='Name' title='Name'>
                <UserIcon />
              </label>
              <input
                readOnly
                name='name'
                type='text'
                value={id.docData.name}
                placeholder='Name'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*ADDRESS FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Address' title='Address'>
                <LocationIcon />
              </label>
              <input
                readOnly
                name='address'
                type='text'
                placeholder='Address'
                value={id.docData.address}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*PHONE FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Phone' title='Phone'>
                <DeviceMobileIcon />
              </label>
              <input
                readOnly
                name='phone'
                type='text'
                value={id.docData.phone}
                placeholder='123-4576'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*EMAIL FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Email' title='Email'>
                <EnvelopeIcon />
              </label>
              <input
                readOnly
                name='email'
                type='text'
                placeholder='Email'
                value={id.docData.email}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*NATIONAL ID FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='National ID' title='National ID'>
                <IdentityIcon />
              </label>
              <input
                readOnly
                name='nid'
                type='text'
                placeholder='National ID #'
                value={id.docData.nid}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b border-t py-2 px-4'>
            <h1 className='font-bold'>Banking Information</h1>
          </div>
          {/*NATIONAL INSURANCE FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='National Insurance' title='National Insurance'>
                <ShieldCheckIcon />
              </label>
              <input
                readOnly
                name='nis'
                type='text'
                placeholder='NIS #'
                value={id.docData.banking.nis}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*TAX IDENTIFICATION NUMBER*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                htmlFor='Tax Identification Number'
                title='Tax Identification Number'>
                <TaxIcon />
              </label>
              <input
                readOnly
                name='tin'
                type='text'
                placeholder='TIN #'
                value={id.docData.banking.tin}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full`}
              />
            </div>
          </div>
          {/*BANK*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Bank' title='Bank'>
                <BuildingIcon />
              </label>
              <input
                readOnly
                name='bank'
                type='text'
                placeholder='Bank'
                value={id.docData.banking.bank}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*BRANCH*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Branch' title='Branch'>
                <ShareIcon />
              </label>
              <input
                readOnly
                name='branch'
                type='text'
                placeholder='Branch'
                value={id.docData.banking.branch}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*BANK ACCOUNT*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Bank Account' title='Bank Account'>
                <HashtagIcon />
              </label>
              <input
                readOnly
                name='account'
                type='text'
                placeholder='Account #'
                value={id.docData.banking.account}
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>

          <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-b border-t py-2 px-4'>
            <h1 className='font-bold'>Census Information</h1>
          </div>
          {/*ROLE FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Senior Supervisor'
                title='Senior Supervisor'>
                <TemplateIcon />
              </label>
              <select
                name='role'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full`}>
                <option value={id.docData.role}>{id.docData.role}</option>
              </select>
            </div>
          </div>
          {/*SENIORS*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Senior Supervisor'
                title='Senior Supervisor'>
                <UserRole />
              </label>
              <select
                name='senior'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}>
                <option value={id.docData.senior}>{id.docData.senior}</option>
              </select>
            </div>
          </div>

          {/*ED*/}
          <div className='px-4 py-2 lg:col-span-1'>
            <div className='flex items-center gap-2'>
              <label className='flex font-bold' htmlFor='ED' title='ED'>
                <MapIcon />
              </label>
              <input
                readOnly
                name='ed'
                type='text'
                value={id.docData.ed}
                placeholder='ED#'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*STATUS*/}
          <div className='px-4 py-2 lg:col-span-1'>
            <div className='flex items-center gap-2'>
              <label className='flex font-bold' htmlFor='Status' title='Status'>
                <StatusIcon />
              </label>
              <select
                name='status'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}>
                <option value={id.docData.status}>{id.docData.status}</option>
              </select>
            </div>
          </div>

          <div className='px-4 flex gap-1 lg:col-span-2'>
            {/*CONTRACT*/}
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Contract'
                title='Contract'>
                <ClipboardIcon /> Contract
              </label>
              <select
                name='contract'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full`}>
                <option value={id.docData.contract}>
                  {id.docData.contract}
                </option>
              </select>
            </div>
            {/*OATH*/}
            <div className='flex items-center gap-2'>
              <label className='flex font-bold' htmlFor='Oath' title='Oath'>
                <ClipboardIcon /> Oath
              </label>
              <select
                name='oath'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}>
                <option value={id.docData.oath}>{id.docData.oath}</option>
              </select>
            </div>
          </div>
          <div className='px-4 flex gap-1 lg:col-span-2'>
            {/*SUPERVISOR ID */}
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor="Supervisor's ID"
                title="Supervisor's ID">
                <IdentityIcon /> ID
              </label>
              <select
                name='enumId'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}>
                <option value={id.docData.id}>{id.docData.id}</option>
              </select>
            </div>
            {/*TRANSPORTATION */}
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Transport'
                title='Transport'>
                <TrendingIcon /> Transportation
              </label>
              <select
                name='transport'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}>
                <option value={id.docData.transport}>
                  {id.docData.transport}
                </option>
              </select>
            </div>
          </div>
          {/*TABLET ID*/}
          <div className='px-4 flex gap-1 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Tablet'
                title='Tablet Serial Code'>
                <DeviceMobileIcon />
              </label>
              <input
                readOnly
                name='tablet'
                type='text'
                maxLength={11}
                value={id.docData.tablet}
                placeholder='R9WR20HEF6J'
                className={`bg-gray-100 text-gray-400 p-2 rounded-lg border w-full `}
              />
            </div>
          </div>
          {/*SUBMIT*/}
          <div className='px-3 py-2 sm:col-span-2 lg:col-span-6 border-t'>
            <div className='flex items-center gap-2 '>
              <input
                readOnly
                onClick={handleSubmit(async () => {
                  try {
                    await firebase.deleteSupervisor(props.id);
                  } catch (error) {
                    console.log(error);
                  }
                })}
                type='submit'
                value='Delete'
                className='py-2 px-4 text-white rounded-lg bg-green-500'
              />
              <Link href='/dashboard/supervisors'>
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

export default DeleteSupervisorView;
