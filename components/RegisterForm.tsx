'use client';

import Link from 'next/link';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

const RegisterForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if(!name && !email && !password) {
            setErrorMessage('Please fill all the fields');
            return;
        }

        try{

            const resUserExist = await fetch('api/userExists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserExist.json();

            if(user){
                setErrorMessage("User already exists");
                return;
            }
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, email, password})
            });

            if(res.ok){
                const form = e.target;
                form.reset();
                router.push("/")
            } else{
                console.log("User registration failed.");
            }
        } catch (errorMessage){
            console.log("Error during registration: ", errorMessage);
        }
    }

    return (
        <div className={"grid place-items-center h-screen"}>
            <div className={"shadow-lg p-5 rounded-lg border-t-4 border-red-600"}>
                <h1 className={"text-xl font-bold my-4"}>Register</h1>

                <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
                    <input  onChange={e => setName(e.target.value)} className={'rounded-md'} type={"text"} placeholder={"Full Name"}/>
                    <input onChange={e => setEmail(e.target.value)} className={'rounded-md'} type={"text"} placeholder={"Email"}/>
                    <input onChange={e => setPassword(e.target.value)} className={'rounded-md'} type={"password"} placeholder={"Password"}/>
                    <button className={"bg-red-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md"}>Register
                    </button>

                    { errorMessage && (
                        <div className={"bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2"}>{errorMessage}
                        </div>
                    )}


                    <Link href={"/"} className={"text-sm mt-3 text-right"}>
                    Dont have an account? <span className={"underline cursor-pointer"}>Login</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;