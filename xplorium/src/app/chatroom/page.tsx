import { auth } from "@/auth";
import ChatRoomClient from "@/components/ChatRoomClient";
import { redirect } from "next/navigation";
import { insertUser } from "@/lib/insertUser";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function ChatRoom() {
  // ✅ Fetch session using `auth()`
  // const session = await auth();
  let session = await auth();
  let user = null;

  // Redirect to login page if no session exists
  // if (!session?.user) {
    // redirect("/login");
  // }

  if (session?.user) {
    user = {
      username: session.user.name!,
      email: session.user.email!,
      avatar_link: session.user.image || null,
    };
  } else {
    // Check if JWT token exists in cookie
    const token = cookies().get("token")?.value;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        user = {
          username: decoded.username,
          email: decoded.email,
          avatar_link: null,
        };    
      } catch (error) {
        console.error("Invalid JWT: ", error);
      }
    }
  }

  if (!user) {
    redirect("/login");
  }

  console.log(session);

  // Extract user data
  // const userData = {
    // username: session.user.name!,
    // email: session.user.email!,
    // avatar_link: session.user.image || null,
  // };

  // console.log("userData: ", userData);

  // Insert user into database
  // const dbUser = await insertUser(userData);
  const dbUser = await insertUser(user);

  console.log("Authenticated user: ", dbUser);


  // return <ChatRoomClient user={session.user} />;
  return <ChatRoomClient user={user} />;
}