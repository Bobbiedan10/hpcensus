import DeviceMobileIcon from "../icons/device-mobile-icon";
import StatusIcon from "../icons/status-icon";
import UserIcon from "../icons/user-icon";
import UserRole from "../icons/user-role";

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
          <div className='col-span-12 flex flex-wrap lg:flex-row gap-4 lg:items-center py-3 px-2 lg:px-4 bg-yellow-500 text-white'>
            <h1 className='flex items-center font-semibold text-lg'>
              <UserRole />
              {id.docData.name}
            </h1>
            <div className='text-lg items-center flex'>
              <StatusIcon /> <b>{id.docData.status}</b>
            </div>
            <div className='text-lg items-center flex'>
              <DeviceMobileIcon /> <b>{id.docData.phone}</b>
            </div>
            <div className='text-lg items-center flex'>
              <DeviceMobileIcon />{" "}
              <b>
                {id.docData.tabletId == "" ? (
                  <i>No tablet assigned</i>
                ) : (
                  id.docData.tabletId
                )}
              </b>
            </div>
          </div>
          {supervisor.map((supe, i) =>
            supe.docData.senior == id.docData.name ? (
              <div
                key={i}
                className='col-span-12  text-white font-extrabold flex overflow-x-auto'>
                <div className='w-full '>
                  <div className='py-2  px-4 bg-orange-500'>Supervisor</div>
                  <div className='flex'>
                    <div className='bg-gray-700 px-6 py-4 border-b-2'>
                      {i + 1}
                    </div>
                    <div className=' text-black w-full flex items-center px-4 gap-4 border-b-2'>
                      <h1 className='flex items-center whitespace-nowrap'>
                        <UserIcon />
                        {supe.docData.name}
                      </h1>
                      <h1 className='flex items-center'>
                        <StatusIcon />
                        {supe.docData.status}
                      </h1>
                      <h1></h1>
                      <h1></h1>
                      <h1></h1>
                    </div>
                  </div>
                  {enumerator.map((enume, j) =>
                    enume.docData.supervisor == supe.docData.name ? (
                      <div key={j} className='flex'>
                        <div className='bg-pink-600 px-1.5 border-b-2'>
                          <h1 className=' transform -rotate-90 translate-y-4'>
                            Enum
                          </h1>
                        </div>
                        <div className='bg-gray-700 px-6 py-4 border-b-2'>
                          {j + 1}
                        </div>

                        <div className='w-full flex items-center px-4 gap-4 border-b-2 text-black'>
                          <div className='flex items-center whitespace-nowrap'>
                            <UserIcon />
                            {enume.docData.name}
                          </div>
                          <div className='flex items-center'>
                            <StatusIcon /> {enume.docData.status}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className='py-2 px-4 text-black '>No Eumerators</div>
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
