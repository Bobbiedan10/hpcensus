import DeviceMobileIcon from "../icons/device-mobile-icon";
import MapIcon from "../icons/map-icon";
import StatusIcon from "../icons/status-icon";
import UserIcon from "../icons/user-icon";
import UserRole from "../icons/user-role";
import MailIcon from "../icons/mail-icon";

function SeniorSupervisorView(props) {
  const { identity, supes, enums } = props;
  let iden;
  let supervisor = JSON.parse(supes);
  let enumerator = JSON.parse(enums);
  console.log(supervisor);
  if (identity) {
    iden = JSON.parse(identity);
  }
  return (
    <div className='flex'>
      {iden.map((id, index) => (
        <div className='grid grid-cols-12 w-full ' key={index}>
          <div className='col-span-12 flex flex-wrap lg:flex-row gap-12 lg:items-center py-2 px-2 lg:px-4 '>
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
            <div className='flex items-center'>
              <MailIcon /> {id.docData.email}
            </div>
            <div className='items-center flex'>
              <DeviceMobileIcon />
              {id.docData.tabletId == "" ? (
                <i>No tablet assigned</i>
              ) : (
                <div>{id.docData.tabletId}</div>
              )}
            </div>
          </div>
          {supervisor.map((supe, i) =>
            supe.docData.senior == id.docData.name ? (
              <div
                key={i}
                className='col-span-12  text-white flex overflow-x-auto'>
                <div className='w-full '>
                  <div className='py-1  px-4 bg-orange-500'>Supervisor</div>
                  <div className='flex'>
                    <div className='bg-gray-700 px-4 py-2 border-b-2'>
                      {i + 1}
                    </div>
                    <div className=' text-black w-full flex items-center px-4 gap-12 border-b-2'>
                      <h1 className='flex items-center whitespace-nowrap'>
                        <UserIcon />
                        {supe.docData.name}
                      </h1>
                      <h1 className='flex items-center'>
                        <StatusIcon />
                        {supe.docData.status}
                      </h1>
                      <div className='flex items-center'>
                        <DeviceMobileIcon /> {supe.docData.phone}
                      </div>
                      <div className='flex items-center'>
                        <MailIcon /> {supe.docData.email}
                      </div>
                      <div className='items-center flex'>
                        <DeviceMobileIcon />{" "}
                        {supe.docData.tablet == "" ? (
                          <i>No tablet assigned</i>
                        ) : (
                          <div>{supe.docData.tablet}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  {enumerator.map((enume, j) =>
                    enume.docData.supervisor == supe.docData.name ? (
                      <div key={j} className='flex'>
                        <div className='flex items-center bg-pink-600 px-4 py-2 border-b-2'>
                          Enum
                        </div>
                        {/* <div className='bg-gray-700 px-4  border-b-2'>
                          {j + 1}
                        </div> */}

                        <div className='w-full flex items-center px-4 gap-12 border-b-2 text-black'>
                          <div className='flex items-center whitespace-nowrap'>
                            <UserIcon />
                            {enume.docData.name}
                          </div>

                          <div className='flex items-center'>
                            <StatusIcon /> {enume.docData.status}
                          </div>
                          <div className='flex items-center'>
                            <DeviceMobileIcon /> {enume.docData.phone}
                          </div>
                          <div className='flex items-center'>
                            <MailIcon /> {enume.docData.email}
                          </div>
                          <div className='flex items-center'>
                            <MapIcon /> {enume.docData.ed.slice(-1)}
                          </div>
                          <div className='flex items-center'>
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
              </div>
            ) : (
              <div>No Supervisors</div>
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default SeniorSupervisorView;
