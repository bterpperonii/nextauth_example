import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return <button type="submit"  onClick={() => signIn()}>Log In</button>;
};

export const LogoutButton = () => {
  return <button type="submit" onClick={() => signOut()}>Log Out</button>;
};