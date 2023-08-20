'use client';
import getSongsByUserId from '@/actions/getSongsByUserId';
import Box from '@/components/Box';
import { FC } from 'react';

interface ErrorProps {}

const Error: FC<ErrorProps> = ({}) => {
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">Something went wrong.</div>
        </Box>
    );
};

export default Error;
