"use client";

import {SessionProvider} from 'next-auth/react';

// @ts-ignore
export const AuthProvider = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
};