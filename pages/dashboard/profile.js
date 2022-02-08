import Layout from "../../components/layout/layout";
import firebase from "../../firebase/firebase";
import EnvelopeIcon from "../../components/icons/mail-icon";
import RefreshIcon from "../../components/icons/refresh-icon";
import Link from "next/link";
import UserIcon from "../../components/icons/user-icon";
import ShieldCheckIcon from "../../components/icons/shield-check-icon";
function Profile() {
  const profile = firebase.getProfile();
  return (
    <Layout>
      <div className='mt-14 mx-auto max-w-7xl p-2 space-y-4'>
        <div className='flex items-center justify-between py-2 border-b'>
          <h1 className='text-lg'>Profile</h1>
          <Link href='/dashboard/create-account'>
            <a className='py-2 px-2 text-white bg-blue-500 rounded-lg'>
              Add User
            </a>
          </Link>
        </div>

        <div className='md:flex'>
          <div className='border rounded-lg text-left shadow'>
            <div className='p-2 flex items-center gap-2'>
              <b>
                <UserIcon />
              </b>
              {profile.name}
            </div>
            <div className='p-2 flex items-center gap-2'>
              <b>
                <EnvelopeIcon />
              </b>
              {profile.email}
            </div>
            <div className='p-2 flex items-center gap-2'>
              <b>
                <ShieldCheckIcon />
              </b>
              {profile.verified ? (
                "verified"
              ) : (
                <span
                  style={{ color: "skyblue", cursor: "pointer" }}
                  onClick={async () => {
                    var sendverification = await firebase.sendVerification();
                    if (sendverification) {
                      message.success("Verification email sent");
                    } else {
                      message.error(
                        "Something went wrong while sending verification"
                      );
                    }
                  }}>
                  not verified
                </span>
              )}
            </div>
            <div className='border-t p-2'>
              <Link href='/dashboard/reset-password'>
                <a className='flex gap-2 border px-2 py-2 rounded-lg bg-green-500 text-white'>
                  <RefreshIcon /> Reset Password
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
