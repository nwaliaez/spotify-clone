import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BoxProps {
    children: ReactNode;
    className?: string;
}

const Box: FC<BoxProps> = ({ children, className }) => {
    return (
        <div
            className={twMerge(
                `bg-neutral-900 rounded-lg h-fit w-full`,
                className
            )}
        >
            {children}
        </div>
    );
};

export default Box;
