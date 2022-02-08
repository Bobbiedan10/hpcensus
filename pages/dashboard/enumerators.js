import Link from "next/link";
import Layout from "../../components/layout/layout";
import firebase from "../../firebase/firebase";
function Enumerators(props) {
  const { allEnum } = props;
  // let allEnums = JSON.parse(allEnum);
  console.log(allEnum);
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
                    transistions
                    duration-150
                  hover:bg-yellow-500 ease-in-out hover:text-white
                    hover:font-bold'>
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
                  bg-pink-600 text-white
                    font-bold
                    transistions
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
                <thead className=''>
                  <tr className='text-left bg-blue-600 text-white'>
                    <th className='px-2 lg:px-4 py-3'>Name</th>
                    <th className='px-2 lg:px-4 py-3'>Supervisor</th>
                    <th className='px-2 lg:px-4 py-3'>Senior</th>
                    <th className='px-2 lg:px-4 py-3'>Status</th>
                    <th className='px-2 lg:px-4 py-3'>ED</th>
                    <th className='px-2 lg:px-4 py-3'>Contact #</th>
                    <th className='px-2 lg:px-4 py-3'>Actions</th>
                  </tr>
                </thead>
                <tbody className=''>
                  {allEnum.length == 0 ? (
                    <tr>
                      <td>
                        <div className='flex absolute w-full h-full lg:h-96 mb-20 lg:my-0 lg:mt-28 items-center justify-center font-bold text-3xl'>
                          <h1>No Enumerator Data</h1>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    allEnum.map((theEnum) => (
                      <tr className='border-b' key={theEnum.id}>
                        <td className='px-2 lg:px-4 py-3'>
                          {theEnum.docData.name}
                        </td>
                        <td className='px-2 lg:px-4 py-3'>
                          {theEnum.docData.supervisor}
                        </td>
                        <td className='px-2 lg:px-4 py-3'>
                          {theEnum.docData.senior}
                        </td>
                        <td className='px-2 lg:px-4 py-3'>
                          {theEnum.docData.status}
                        </td>
                        <td className='px-2 lg:px-4 py-3'>
                          {theEnum.docData.ed.slice(-1)}
                        </td>
                        <td className='px-2 lg:px-4 py-3'>
                          {theEnum.docData.phone}
                        </td>
                        <td className='px-2 lg:px-4 '>
                          <div className='flex gap-2'>
                            <Link
                              href={`edit/enumerator/${theEnum.id}`}
                              as={`edit/enumerator/${theEnum.id}`}>
                              <a className='bg-green-500 text-white py-2 px-2 rounded-lg'>
                                Edit
                              </a>
                            </Link>
                            <Link href={`delete/enumerator/${theEnum.id}`}>
                              <a className='bg-red-500 text-white py-2 px-2 rounded-lg'>
                                Delete
                              </a>
                            </Link>
                            <Link href={`details/enumerator/${theEnum.id}`}>
                              <a className='bg-blue-500 text-white py-2 px-2 rounded-lg'>
                                View
                              </a>
                            </Link>
                          </div>
                        </td>
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

export async function getStaticProps() {
  let allEnum = await firebase.getCollection("enumerators");

  return {
    props: {
      allEnum: allEnum,
    },
  };
}
export default Enumerators;
