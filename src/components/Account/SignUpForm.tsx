"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '@/appwrite/authService';
import { login } from '@/store/features/authSlice';
import Input from '../Input/Input';
import Button from '../Input/Button';
import Loader from '../Loader/Loader';
import { CreateNewAccount } from '@/interfaces/interface';

export default function SignUpForm() {

    // Dispatch functions.
    const dispatch = useDispatch();

    // State to track error and loading.
    const [appwriteError, setAppwriteError] = useState<string | null>(null);

    // Getting register and handleSubmit function from useForm.
    const { register, handleSubmit, formState: { isSubmitting, errors } } = useForm<CreateNewAccount>();

    // Function to handle signup.
    const handleSignUp = async (data: CreateNewAccount) => {

        try {
            // Try to create a new user account.
            const userData = await authService.createNewAccount(data);

            // If account created, the get current user and update store.
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(login({ userData }));
            };
        } catch (error) {
            setAppwriteError((error as Error).message || 'An unexpected error occurred');
        }
    };

    return (
        <form
            className="mt-7 w-fit mx-auto"
            onSubmit={handleSubmit(handleSignUp)}
        >
            {isSubmitting && <Loader containerClasses="!fixed" />}

            {
                appwriteError && <p className="text-red-500 my-2">
                    {appwriteError}
                </p>
            }

            <Input
                id="name"
                label="Name:"
                placeholder="Enter your name"
                error={errors.name?.message}
                {...register('name', {
                    required: "Name is required",
                })}
            />

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
                placeholder="Create password"
                type="password"
                error={errors.password?.message}
                {...register('password', {
                    required: "Password is required",
                    minLength: {
                        value: 8,
                        message: "8 characters requried"
                    },
                })}
            />

            <Button type="submit">
                Sign Up
            </Button>
        </form>
    );
};
