// pages/register/index.js

import SignUpPage from "@/components/SignUpPage";
import { getSession } from "next-auth/react";

export default function Register() {
  return <SignUpPage />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/chatroom",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
