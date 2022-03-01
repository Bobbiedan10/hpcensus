import DeviceMobileIcon from "../icons/device-mobile-icon";
import MapIcon from "../icons/map-icon";
import MailIcon from "../icons/mail-icon";
import StatusIcon from "../icons/status-icon";
import UserIcon from "../icons/user-icon";
import UserRole from "../icons/user-role";

function SupervisorView(props) {
  const { identity, enums } = props;

  let iden;
  let enumerator = JSON.parse(enums);
  if (identity) {
    iden = JSON.parse(identity);
  }
  return (
    <div className='flex'>
      {iden.map((id, index) => (
        <div className='grid grid-cols-12 w-full ' key={index}>
          <div className='col-span-12 flex flex-wrap lg:flex-row bg-orange-600 text-white gap-x-12 gap-y-2 lg:items-center py-2 px-2 lg:px-4 border-b-2'>
            <h1 className='flex items-center font-semibold'>
              <UserRole />
              {id.docData.name}
            </h1>
            <div className='items-center flex'>
              <StatusIcon /> {id.docData.status}
            </div>
            <div className='items-center flex'>
              <DeviceMobileIcon /> {id.docData.phone}
            </div>
            <div className='items-center flex'>
              <MailIcon /> {id.docData.email}
            </div>
            <div className='items-center flex'>
              <DeviceMobileIcon />
              {id.docData.tablet == "" ? (
                <i>No tablet assigned</i>
              ) : (
                <div>{id.docData.tablet}</div>
              )}
            </div>
          </div>
          {enumerator.map((enume, j) =>
            enume.docData.supervisor == id.docData.name ? (
              <div
                key={j}
                className='col-span-12 flex overflow-x-auto whitespace-nowrap '>
                <div className='bg-pink-600 px-4 py-2 border-b-2 text-white font-bold'>
                  {j + 1}
                </div>

                <div className='w-full flex items-center px-4 gap-12 border-b-2 dark:bg-gray-500 text-black'>
                  <div className='flex items-center'>
                    <UserIcon />
                    {enume.docData.name}
                  </div>
                  <div className='flex items-center'>
                    <DeviceMobileIcon /> {enume.docData.phone}
                  </div>
                  <div className='flex items-center'>
                    <StatusIcon /> {enume.docData.status}
                  </div>
                  <div className='flex items-center'>
                    <MapIcon /> {enume.docData.ed.slice(-1)}
                  </div>
                  <div className='flex items-center px-2'>
                    <DeviceMobileIcon />{" "}
                    {enume.docData.tablet == "" ? (
                      <i>No tablet assigned</i>
                    ) : (
                      enume.docData.tablet
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
              // <div className='flex  text-black border-b-2'>
              //   <div className='flex text-white items-center bg-pink-600 px-1 border-b-2'>
              //     Enum
              //   </div>
              //   <div className='text-white bg-gray-700 px-4 py-2 border-b-2'>
              //     {j + 1}
              //   </div>
              //   <div className='flex items-center px-4'>
              //     No Eumerators
              //   </div>
              // </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default SupervisorView;
