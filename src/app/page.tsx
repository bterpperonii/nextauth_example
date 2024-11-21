"use client";

import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Home Page</h1>
      <p>
        {session ? (
          <button onClick={() => signOut()}>Sign out</button>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </p>
    </div>
  );
}
