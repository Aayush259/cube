"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { RootState } from "@/interfaces/interface";
import authService from "./authService";
import { login } from "@/store/features/authSlice";
import Loader from "@/components/Loader/Loader";

const AppwriteAuthServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    // Get auth state from redux store.
    const { status, userData } = useSelector(((state: RootState) => state.auth));

    // State to check if user data is being fetched.
    const [gettingUser, setGettingUser] = useState<boolean>(true);

    // Dispatch function from redux store.
    const dispatch = useDispatch();

    // Initialize router and pathname from nextjs.
    const router = useRouter();
    const pathname = usePathname();

    // List of public routes.
    const publicRoutes = ["/welcome", "/login", "/signup"];

    useEffect(() => {
        // If user is logged in and and not on login or signup or welcome page, then do nothing.
        if (status && userData && !publicRoutes.includes(pathname)) return;
        
        // If user is logged in and trying to access login or signup or welcome page, redirect to home page.
        if (status && userData && publicRoutes.includes(pathname)) {
            router.push("/");
            return;
        }

        // If user is not logged in and trying to access home page, redirect to welcome page.
        if (!status && !publicRoutes.includes(pathname)) {
            router.push("/welcome");
        }

        // Get user data from appwrite.
        authService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login(userData));
                    router.push("/");
                } else {
                    console.log("User not found");
                }
            })
            .catch((error) => {
                console.log("Appwrite getCurrentUser service error:", error);
            })
            .finally(() => {
                setGettingUser(false);
            });
    }, [pathname]);

    // If user data is being fetched, then return loader.
    if (gettingUser) return <Loader />;

    return (
        <div>
            {children}
        </div>
    );
};

export default AppwriteAuthServiceProvider;
