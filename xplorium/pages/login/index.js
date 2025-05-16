// pages/login/index.js

import LoginPage from "@/components/LoginPage";
import { getSession } from "next-auth/react";

export default function Login() {
  return <LoginPage />;
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
