import Link from "next/link";
import Layout from "../../components/layout/layout";
import firebase from "../../firebase/firebase";
import "firebase/compat/firestore";
function Dashboard(props) {
  const profile = firebase.getProfile();
  return (
    <Layout>
      <div className='mx-auto lg:h-screen'>
        <div className='grid lg:grid-cols-6 h-full'>
          <div className='lg:col-span-1 mt-14 bg-gray-100 dark:bg-gray-700 '>
            <ul className='flex lg:flex-col dark:bg-gray-600  dark:text-gray-300'>
              <li className='h-14 hover:bg-yellow-500 transition ease-in-out duration-150 flex items-center border-b-2'>
                <Link href='/dashboard/senior-supervisors'>
                  <a className='h-full w-full flex items-center px-2'>
                    Senior Supervisors
                  </a>
                </Link>
              </li>
              <li className='h-14 hover:bg-orange-600 transition ease-in-out duration-150 flex items-center border-b-2'>
                <Link href='/dashboard/supervisors'>
                  <a className='h-full w-full flex items-center px-2'>
                    Supervisors
                  </a>
                </Link>
              </li>
              <li className='h-14 hover:bg-pink-600 transition ease-in-out duration-150 flex items-center border-b-2'>
                <Link href='/dashboard/enumerators'>
                  <a className='h-full w-full flex items-center px-2'>
                    Enumerators
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className='lg:mt-14 lg:col-span-5 flex flex-col space-y-4'>
            <div className='flex items-center justify-between px-2 lg:px-4 py-3 dark:bg-gray-400 bg-gray-300'>
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
              <div className='rounded-lg border shadow flex flex-col dark:bg-gray-400'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Active Seniors
                </h1>
                <div className='p-'>
                  <h1 className='flex justify-center text-8xl font-semibold dark:text-gray-200'>
                    {props.ssupeCount}
                  </h1>
                </div>
              </div>

              <div className='rounded-lg border shadow flex dark:bg-gray-400 flex-col'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Active Supervisors
                </h1>
                <div className='p-'>
                  <h1 className='flex justify-center text-8xl font-semibold dark:text-gray-200'>
                    {props.supeCount}
                  </h1>
                </div>
              </div>

              <div className='rounded-lg border shadow flex dark:bg-gray-400 flex-col'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Active Enumerators
                </h1>
                <div className=''>
                  <h1 className='flex justify-center text-8xl font-semibold dark:text-gray-200'>
                    {props.enumCount}
                  </h1>
                </div>
              </div>
            </div>
            <div className='px-4 pb-4 grid gap-4 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3'>
              <div className='rounded-lg border shadow flex dark:bg-gray-400 flex-col'>
                <h1 className=' border-b p-2 font-bold text-xl text-blue-600'>
                  Enumerators in Parish
                </h1>
                <div className='p-2'>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Michael </b> <b>{props.smichaelCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>Christ Church</b> <b>{props.chchCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. George </b> <b>{props.sgeorgeCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Philip</b> <b>{props.sphilipCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. John </b> <b>{props.sjohnCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. James </b> <b>{props.sjamesCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Thomas </b> <b>{props.sthomasCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Joseph </b> <b>{props.sjosephCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Andrew</b> <b>{props.sandrewCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Peter </b> <b>{props.speterCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 border-b justify-between dark:text-gray-200'>
                    <b>St. Lucy </b> <b>{props.slucyCount}</b>
                  </h1>
                  <h1 className='flex py-0.5 justify-between dark:text-gray-200'>
                    <b>Not Assigned </b> <b>{props.naCount}</b>
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

export async function getServerSideProps() {
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

  let smichaelCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Michael"
  );

  let chchCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "Christ Church"
  );

  let sgeorgeCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. George"
  );

  let sphilipCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Philip"
  );

  let sjohnCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. John"
  );

  let sjamesCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. James"
  );

  let sthomasCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Thomas"
  );

  let sjosephCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Joseph"
  );

  let sandrewCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Andrew"
  );

  let speterCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Peter"
  );

  let slucyCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "St. Lucy"
  );

  let naCount = await firebase.getCountByCondition(
    "enumerators",
    "enum_parish",
    "==",
    "Not Assigned"
  );

  return {
    props: {
      enumCount: enumCount,
      supeCount: supeCount,
      ssupeCount: ssupeCount,
      smichaelCount: smichaelCount,
      chchCount: chchCount,
      sgeorgeCount: sgeorgeCount,
      sphilipCount: sphilipCount,
      sjohnCount: sjohnCount,
      sjamesCount: sjamesCount,
      sthomasCount: sthomasCount,
      sjosephCount: sjosephCount,
      sandrewCount: sandrewCount,
      speterCount: speterCount,
      slucyCount: slucyCount,
      naCount: naCount,
    },
  };
}

export default Dashboard;
