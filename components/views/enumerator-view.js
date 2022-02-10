import Link from "next/link";
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

function EnumeratorView(props) {
  const { identity } = props;
  let iden;
  if (identity) {
    iden = JSON.parse(identity);
  }

  return (
    <div>
      {iden.map((id, index) => (
        <div
          key={index}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 space-y-4'>
          <div className='bg-blue-600 text-white sm:col-span-2 border-t-2 border-b-2 lg:col-span-6 py-2 px-4'>
            <h1 className='font-bold'>Basic Information</h1>
          </div>
          {/*NAME FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Name' title='Name'>
                <UserIcon />
              </label>
              <div>{id.docData.name}</div>
            </div>
          </div>
          {/*ADDRESS FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Address' title='Address'>
                <LocationIcon />
              </label>
              <div>{id.docData.address}</div>
            </div>
          </div>
          {/*PHONE FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Phone' title='Phone'>
                <DeviceMobileIcon />
              </label>
              <div>{id.docData.phone}</div>
            </div>
          </div>
          {/*EMAIL FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Email' title='Email'>
                <EnvelopeIcon />
              </label>
              <div>{id.docData.email}</div>
            </div>
          </div>
          {/*NATIONAL ID FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='National ID' title='National ID'>
                <IdentityIcon />
              </label>
              <div>{id.docData.nid}</div>
            </div>
          </div>
          <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-t-2 border-b-2 py-2 px-4'>
            <h1 className='font-bold'>Banking Information</h1>
          </div>
          {/*NATIONAL INSURANCE FIELD*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='National Insurance' title='National Insurance'>
                <ShieldCheckIcon />
              </label>
              <div>{id.docData.banking.nis}</div>
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
              <div>{id.docData.banking.tin}</div>
            </div>
          </div>
          {/*BANK*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Bank' title='Bank'>
                <BuildingIcon />
              </label>
              <div>{id.docData.banking.bank}</div>
            </div>
          </div>
          {/*BRANCH*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Branch' title='Branch'>
                <ShareIcon />
              </label>
              <div>{id.docData.banking.branch}</div>
            </div>
          </div>
          {/*BANK ACCOUNT*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label htmlFor='Bank Account' title='Bank Account'>
                <HashtagIcon />
              </label>
              <div>{id.docData.banking.account}</div>
            </div>
          </div>

          <div className='bg-blue-600 text-white sm:col-span-2 lg:col-span-6 border-t-2 border-b-2 py-2 px-4'>
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
              <div>{id.docData.role}</div>
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
              <div>{id.docData.senior}</div>
            </div>
          </div>
          {/*SUPERVISORS*/}
          <div className='px-4 lg:col-span-2'>
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Supervisor'
                title='Supervisor'>
                <UserIcon />
              </label>
              <div>{id.docData.supervisor}</div>
            </div>
          </div>
          {/*ED*/}
          <div className='px-4 py-2 lg:col-span-1'>
            <div className='flex items-center gap-2'>
              <label className='flex font-bold' htmlFor='ED' title='ED'>
                <MapIcon />
              </label>
              <div>{id.docData.ed.slice(-1)}</div>
            </div>
          </div>
          {/*STATUS*/}
          <div className='px-4 py-2 lg:col-span-1'>
            <div className='flex items-center gap-2'>
              <label className='flex font-bold' htmlFor='Status' title='Status'>
                <StatusIcon />
              </label>
              <div>{id.docData.status}</div>
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
              <div>{id.docData.contract}</div>
            </div>
            {/*OATH*/}
            <div className='flex items-center gap-2'>
              <label className='flex font-bold' htmlFor='Oath' title='Oath'>
                <ClipboardIcon /> Oath
              </label>
              <div>{id.docData.oath}</div>
            </div>
          </div>
          <div className='px-4 flex gap-1 lg:col-span-2'>
            {/*ENUMERATOR ID */}
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor="Enumerator's ID"
                title="Enumerator's ID">
                <IdentityIcon /> ID
              </label>
              <div>{id.docData.id}</div>
            </div>
            {/*TRANSPORTATION */}
            <div className='flex items-center gap-2'>
              <label
                className='flex font-bold'
                htmlFor='Transport'
                title='Transport'>
                <TrendingIcon /> Transportation
              </label>
              <div>{id.docData.transport}</div>
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
              {id.docData.tablet == "" ? (
                <div>No tablet assigned</div>
              ) : (
                <div>{id.docData.tablet}</div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EnumeratorView;
