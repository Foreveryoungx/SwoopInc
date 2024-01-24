
// @ts-ignore
import RegisterForm from '../../components/RegisterForm';
import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';
import authOptions from '@/lib/authOptions';


const Register = async () => {
    const session = await getServerSession(authOptions);

    if (session) redirect('/dashboard');
    return (
        <RegisterForm />
    );
};

export default Register;