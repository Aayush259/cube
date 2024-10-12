import Link from "next/link";
import LoginIcon from '@mui/icons-material/Login';
import SignUpForm from "@/components/Account/SignUpForm";

export default function Signup() {

    return (
        <div
            className="min-h-[80vh] w-screen mx-auto my-4 flex items-center justify-center relative"
        >
            <div className="bg-[#cbd5e11a] p-4 mx-auto w-[600px] max-w-[90vw] rounded-xl">
                <h2 className="text-xl font-semibold flex items-center justify-center w-fit gap-2">
                    <LoginIcon />
                    Sign Up
                </h2>

                <SignUpForm />

                <p className="flex gap-1 w-fit mx-auto my-5">
                    Already have an account?
                    <Link
                        href='/login'
                        className="text-sky-400 hover:underline underline-offset-4"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};
