import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Song } from '../../types/types';
import { headers, cookies } from 'next/headers';

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies,
    });

    const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', sessionData.session?.user.id)
        .order('created_at', { ascending: false });

    return (data as any) || [];
};

export default getSongsByUserId;
