import Link from "next/link";
import Tabs from "../../components/layout/tabs";
import Layout from "../../components/layout/layout";
import firebase from "../../firebase/firebase";

function AddNewPerson(props) {
  const profile = firebase.getProfile();
  return (
    <Layout>
      <div className='mx-auto lg:h-screen'>
        <div className='grid lg:grid-cols-6 h-full'>
          <div className='lg:col-span-1 mt-14 dark:bg-gray-700 bg-gray-100 '>
            <ul className='flex lg:flex-col dark:bg-gray-600 dark:text-gray-300'>
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
          <div className='lg:mt-14 lg:col-span-5 flex flex-col'>
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

            <Tabs supes={props.supes} seniors={props.seniors} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let seniors = await firebase.getCollection("senior-supervisors");
  let supervisor = await firebase.getCollection("supervisors");

  let supes = JSON.stringify(supervisor);
  return {
    props: {
      seniors: seniors,
      supes: supes,
    },
    revalidate: 600,
  };
}
export default AddNewPerson;
