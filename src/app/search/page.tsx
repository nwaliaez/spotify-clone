import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import { FC } from 'react';
import SearchContent from './components/SearchContent';

interface SearchProps {
    searchParams: {
        title: string;
    };
}

export const revalidate = 0;

const Search: FC<SearchProps> = async ({ searchParams }) => {
    const songs = await getSongsByTitle(searchParams.title);
    return (
        <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        <SearchInput />
                    </h1>
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    );
};

export default Search;
