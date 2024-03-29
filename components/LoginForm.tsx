"use client";

import Link from 'next/link';
import {useState} from 'react';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try{
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            // @ts-ignore
            if (res.error){
                setError("Invalid Email or Password");
                return;
            }
            router.replace("dashboard");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={"grid place-items-center h-screen"}>
            <div className={"shadow-lg p-5 rounded-lg border-t-4 border-red-600"}>
                <h1 className={"text-xl font-bold my-4"}>Login</h1>

                <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
                    <input onChange={e => setEmail(e.target.value)} className={'rounded-md'} type={"text"} placeholder={"Email"}/>
                    <input onChange={e => setPassword(e.target.value)} className={'rounded-md'} type={"password"} placeholder={"Password"}/>
                    <button className={"bg-red-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md"}>Login</button>
                    {error && (
                        <div className={"bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2"}>{error}</div>
                    )}


                    <Link href={"/register"} className={"text-sm mt-3 text-right"}>
                        Dont have an account? <span className={"underline cursor-pointer"}>Register</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;