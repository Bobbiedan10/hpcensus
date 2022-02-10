import Link from "next/link";
import Layout from "../../components/layout/layout";
import firebase from "../../firebase/firebase";
function SeniorSupervisor(props) {
  const { allSeniors } = props;
  console.log(allSeniors);
  const profile = firebase.getProfile();
  return (
    <Layout>
      <div className='mx-auto lg:h-screen'>
        <div className='grid lg:grid-cols-6 h-full'>
          <div className='lg:col-span-1 mt-14 bg-gray-100 '>
            <ul className='flex lg:flex-col'>
              <li className='h-14 flex items-center border-b-2'>
                <Link href='/dashboard/senior-supervisors'>
                  <a
                    className='h-full w-full flex items-center px-2
                    
                  bg-yellow-500 text-white
                    font-bold'>
                    Senior Supervisors
                  </a>
                </Link>
              </li>
              <li className='h-14 flex items-center border-b-2'>
                <Link href='/dashboard/supervisors'>
                  <a
                    className='h-full w-full flex items-center px-2 transition duration-150 ease-in-out hover:bg-orange-600 hover:text-white
                  hover:font-bold'>
                    Supervisors
                  </a>
                </Link>
              </li>
              <li className='h-14 flex items-center border-b-2'>
                <Link href='/dashboard/enumerators'>
                  <a
                    className='h-full w-full flex items-center px-2
                  hover:bg-pink-600 hover:text-white
                    hover:font-bold
                    transistions ease-in-out
                    duration-150'>
                    Enumerators
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='lg:mt-14 lg:col-span-5 flex flex-col overflow-x-auto relative'>
            <div className='flex items-center justify-between px-2 lg:px-4 py-3 bg-gray-300 absolute inset-x-0'>
              <h1 className=''>
                <b>Welcome,</b> {profile.name}
              </h1>
              <Link href='/dashboard/add-new-person'>
                <a className='py-1 px-2 text-white rounded bg-green-500'>
                  Add New Person
                </a>
              </Link>
            </div>

            {/*DISPLAY RELEVANT DATA */}
            <div className='mt-14 overflow-x-auto'>
              <table className=' w-full whitespace-nowrap'>
                <thead>
                  <tr className='text-left bg-blue-600 text-white'>
                    <th className='px-2 lg:px-4 py-3'>Name</th>
                    <th className='px-2 lg:px-4 py-3'>Status</th>
                    <th className='px-2 lg:px-4 py-3'>Contact #</th>
                    <th className='px-2 lg:px-4 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allSeniors.length == 0 ? (
                    <tr>
                      <td>
                        <div className='flex absolute w-11/12 h-full lg:h-96 mb-20 lg:my-0 lg:mt-28 items-center justify-center font-bold text-3xl'>
                          <h1>No Senior Supervisor Data</h1>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    allSeniors.map((theSenior) => (
                      <tr className='border-b' key={theSenior.id}>
                        <td className='px-2 lg:px-4 py-3'>
                          {theSenior.docData.name}
                        </td>

                        <td className='px-2 lg:px-4 py-3'>
                          {theSenior.docData.status}
                        </td>
                        <td className='px-2 lg:px-4 py-3'>
                          {theSenior.docData.phone}
                        </td>
                        <td className='px-2 lg:px-4 '>
                          <div className='flex gap-2'>
                            <Link
                              href={`edit/senior-supervisor/${theSenior.id}`}
                              as={`edit/senior-supervisor/${theSenior.id}`}>
                              <a className='bg-green-500 text-white py-2 px-2 rounded-lg'>
                                Edit
                              </a>
                            </Link>
                            <Link
                              href={`delete/senior-supervisor/${theSenior.id}`}>
                              <a className='bg-red-500 text-white py-2 px-2 rounded-lg'>
                                Delete
                              </a>
                            </Link>
                            <Link
                              href={`details/senior-supervisor/${theSenior.id}`}>
                              <a className='bg-blue-500 text-white py-2 px-2 rounded-lg'>
                                View
                              </a>
                            </Link>
                          </div>
                        </td>
                        <td></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  let allSeniors = await firebase.getCollection("senior-supervisors");

  return {
    props: {
      allSeniors: allSeniors,
    },
  };
}

export default SeniorSupervisor;
