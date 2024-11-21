import { signIn } from "$/lib/auth"
import * as React from "react";

interface FormData {
    email: string;
    password: string;
}

export function SignIn() {
    return (
        <form
            action={async (formData: FormData) => {
                "use server";
                await signIn("credentials", formData);
            }}
        >
            <label>
                Email
                <input name="email" type="email" />
            </label>
            <label>
                Password
                <input name="password" type="password" />
            </label>
            <button>Sign In</button>
        </form>
    );
}