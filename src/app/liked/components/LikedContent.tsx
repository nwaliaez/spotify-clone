'use client';
import { FC, useEffect } from 'react';
import { Song } from '../../../../types/types';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import MediaItem from '@/components/MediaItem';
import LikeButton from '@/components/LikeButton';
import useOnPlay from '@/hooks/useOnPlay';

interface LikedContentProps {
    songs: Song[];
}

const LikedContent: FC<LikedContentProps> = ({ songs }) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    const onPlay = useOnPlay(songs);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No liked songs.
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => {
                                onPlay(id);
                            }}
                            data={song}
                        />
                    </div>
                    <div>
                        <LikeButton songId={song.id} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikedContent;
