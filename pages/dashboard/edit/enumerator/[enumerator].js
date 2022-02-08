import Layout from "../../../../components/layout/layout";
import firebase from "../../../../firebase/firebase";
import Link from "next/link";
import EditEnumeratorForm from "../../../../components/forms/edit-enumerator-form";
import { useRouter } from "next/router";
function EditUser(props) {
  const { identity, supes, seniors } = props;
  const profile = firebase.getProfile();
  const router = useRouter();
  const id = router.query.enumerator;

  if (!identity || !supes || !seniors) {
    return (
      <>
        <div className='h-screen flex justify-center items-center '>
          <div className='flex space-x-2 animate-spin'>
            <div className='rounded-full p-4 bg-blue-600  duration-100 shadow-lg'></div>
            <div className='rounded-full p-4 bg-pink-600  duration-150 shadow-lg'></div>
            <div className='rounded-full p-4 bg-orange-600 delay-200 shadow-lg'></div>
          </div>
        </div>
      </>
    );
  }

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
          <div className='lg:mt-14 lg:col-span-5 flex flex-col'>
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
            <div className='flex items-center justify-between px-2 lg:px-4 py-2 text-xl bg-gray-500 text-white font-bold'>
              <h1>Edit</h1>
            </div>
            <div>
              <EditEnumeratorForm
                id={id}
                identity={identity}
                seniors={seniors}
                supes={supes}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          enumerator: "1",
        },
      },
    ],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  let id = params.enumerator;

  let identity = await firebase.getDocument("enumerators", id);
  let seniors = await firebase.getCollection("senior-supervisors");
  let supervisor = await firebase.getCollection("supervisors");
  let iden = JSON.stringify(identity);
  let supes = JSON.stringify(supervisor);

  return {
    props: {
      identity: iden,
      seniors: seniors,
      supes: supes,
    },
  };
}
export default EditUser;
