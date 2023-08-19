import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Song } from '../../types/types';
import { cookies } from 'next/headers';
import getSongs from './getSongs';

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    if (!title) {
        const allSongs = await getSongs();
    }

    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('title', `%${title}%`)
        .order('created_at', { ascending: false });

    return (data as any) || [];
};

export default getSongsByTitle;
