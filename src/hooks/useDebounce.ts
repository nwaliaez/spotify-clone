import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): T {
    const [deboundeValue, setDeboundeValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDeboundeValue(value);
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return deboundeValue;
}

export default useDebounce;
