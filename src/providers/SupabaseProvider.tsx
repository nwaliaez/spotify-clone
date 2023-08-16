'use client';

import {
    createBrowserSupabaseClient,
    createClientComponentClient,
} from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/db';
import { FC, ReactNode, useState } from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface SupabaseProviderProps {
    children: ReactNode;
}

const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
    const supabase = createClientComponentClient<Database>();

    return (
        <SessionContextProvider supabaseClient={supabase}>
            {children}
        </SessionContextProvider>
    );
};

export default SupabaseProvider;
