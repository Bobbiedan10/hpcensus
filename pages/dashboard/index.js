import Link from "next/link";
import Layout from "../../components/layout/layout";
import firebase from "../../firebase/firebase";
import fire from "firebase/compat/app";

import "firebase/compat/firestore";
function Dashboard(props) {
  const profile = firebase.getProfile();
  return (
    <Layout>
      <div className='mx-auto lg:h-screen'>
        <div className='grid lg:grid-cols-6 h-full'>
          <div className='lg:col-span-1 mt-14 bg-gray-100 '>
            <ul className='flex lg:flex-col'>
              <li className='h-14 flex items-center border-b-2'>
                <Link href='/dashboard/senior-supervisors'>
                  <a className='h-full w-full flex items-center px-2'>
                    Senior Supervisors
                  </a>
                </Link>
              </li>
              <li className='h-14 flex items-center border-b-2'>
                <Link href='/dashboard/supervisors'>
                  <a className='h-full w-full flex items-center px-2'>
                    Supervisors
                  </a>
                </Link>
              </li>
              <li className='h-14 flex items-center border-b-2'>
                <Link href='/dashboard/enumerators'>
                  <a className='h-full w-full flex items-center px-2'>
                    Enumerators
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='lg:mt-14 lg:col-span-5 flex flex-col space-y-4'>
            <div className='flex items-center justify-between px-2 lg:px-4 py-3 bg-gray-300'>
              <h1 className=''>
                <b>Welcome,</b> {profile.name}
              </h1>
              <Link href='/dashboard/add-new-person'>
                <a className='py-1 px-2 text-white rounded bg-green-500'>
                  Add New Person
                </a>
              </Link>
            </div>
            <div className='px-4 grid gap-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3'>
              <div className='rounded-lg border shadow flex flex-col'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Active Seniors
                </h1>
                <div className='p-'>
                  <h1 className='flex justify-center text-8xl font-semibold'>
                    {props.ssupeCount == undefined ? `-` : props.ssupeCount}
                  </h1>
                </div>
              </div>

              <div className='rounded-lg border shadow flex flex-col'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Active Supervisors
                </h1>
                <div className='p-'>
                  <h1 className='flex justify-center text-8xl font-semibold'>
                    {props.supeCount == undefined ? `-` : props.supeCount}
                  </h1>
                </div>
              </div>

              <div className='rounded-lg border shadow flex flex-col'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Active Enumerators
                </h1>
                <div className='p-'>
                  <h1 className='flex justify-center text-8xl font-semibold'>
                    {props.enumCount == undefined ? `-` : props.enumCount}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let enumCount = await firebase.getCountByCondition(
    "enumerators",
    "status",
    "==",
    "Active"
  );

  let supeCount = await firebase.getCountByCondition(
    "supervisors",
    "status",
    "==",
    "Active"
  );

  let ssupeCount = await firebase.getCountByCondition(
    "senior-supervisors",
    "status",
    "==",
    "Active"
  );

  return {
    props: {
      enumCount: enumCount,
      supeCount: supeCount,
      ssupeCount: ssupeCount,
    },
    //revalidate: 30,
  };
}

export default Dashboard;
