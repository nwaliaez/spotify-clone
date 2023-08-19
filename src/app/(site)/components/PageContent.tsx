'use client';
import { FC } from 'react';
import { Song } from '../../../../types/types';
import SongItem from '../../../components/SongItem';
import useOnPlay from '@/hooks/useOnPlay';

interface PageContentProps {
    songs: Song[];
}

const PageContent: FC<PageContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return <div className="mt-4 text-neutral-400">No songs available!</div>;
    }
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-4">
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
};

export default PageContent;
