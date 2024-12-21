"use client";

import { useRouter } from "next/router";

import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { postData } from "@/libs/helpers";

const AccountContext = () => {
    const router = useRouter();
    const {isLoading, user} = useUser();

    const [loading, setLoading] = useState(false);
 
    useEffect(() => {
        if(!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try{
            const {url, error} = await postData ({
                url: '/api/create-portal-link'
            });
            window.location.assign(url);
        }catch (error) {
            if(error) {
                toast.error((error as Error).message);
            }
        }
        setLoading(false);
    }
}

export default AccountContext;