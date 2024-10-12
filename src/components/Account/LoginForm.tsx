"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LoginUser } from '@/interfaces/interface';
import { login } from '@/store/features/authSlice';
import authService from '@/appwrite/authService';
import Loader from '../Loader/Loader';
import Input from '../Input/Input';
import Button from '../Input/Button';

export default function LoginForm() {

    // Navigate and dispatch functions.
    const router = useRouter();
    const dispatch = useDispatch();

    // State for appwrite service error.
    const [appwriteError, setAppwriteError] = useState<string | null>(null);

    // Getting register and handleSubmit function from useForm.
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<LoginUser>();

    // Function to handle login.
    const handleLogin = async (data: LoginUser) => {

        try {
            // Try to create a new session by login the user.
            const session = await authService.loginExistingUser(data);

            // If session created successfully, update it in store.
            if (session) dispatch(login({ userData: session }));

            // Navigate home page.
            router.push('/');
        } catch (error) {
            setAppwriteError((error as Error).message || 'An unexpected error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="mt-7 w-fit mx-auto">
            {isSubmitting && <Loader containerClasses="!fixed" />}

            {
                appwriteError && <p className="text-red-500 my-2">
                    {appwriteError}*
                </p>
            }

            <Input
                id="email"
                label="Email:"
                placeholder="Enter your email"
                type="email"
                error={errors.email?.message}
                {...register('email', {
                    required: "Email is required",
                })}
            />

            <Input
                id="password"
                label="Password:"
                placeholder="Enter your password"
                type="password"
                error={errors.password?.message}
                {...register('password', {
                    required: "Password is required",
                })}
            />

            <Button type="submit">
                Sign In
            </Button>
        </form>
    );
};
