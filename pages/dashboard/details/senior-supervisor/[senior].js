import Layout from "../../../../components/layout/layout";
import firebase from "../../../../firebase/firebase";
import Link from "next/link";
import SeniorSupervisorView from "../../../../components/views/senior-supervisor-view";
function ViewSenior(props) {
  const { identity, supes, enums } = props;
  const profile = firebase.getProfile();

  if (!identity) {
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

  console.log(identity, supes, enums);
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
            <div className='flex items-center justify-between px-2 lg:px-4 py-2 text-xl bg-blue-600 text-white font-bold'>
              <h1>View Senior</h1>
            </div>
            <div>
              <SeniorSupervisorView
                identity={identity}
                supes={supes}
                enums={enums}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  let id = params.senior;

  let identity = await firebase.getDocument("senior-supervisors", id);
  let enumerators = await firebase.getCollection("enumerators");
  let supervisor = await firebase.getCollection("supervisors");
  let enums = JSON.stringify(enumerators);
  let iden = JSON.stringify(identity);
  let supes = JSON.stringify(supervisor);

  return {
    props: {
      identity: iden,
      enums: enums,
      supes: supes,
    },
  };
}

// export async function getStaticPaths() {
//   let res = await firebase.getCollection("senior-supervisors");
//   console.log(res);

//   const paths = res.map((path) => ({
//     params: { senior: path.id },
//   }));
//   return {
//     paths,
//     fallback: true,
//   };
// }

export default ViewSenior;
