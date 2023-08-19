import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Song } from '../../types/types';

const useLoadImage = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if (!song) return null;

    const { data: imageData } = supabaseClient.storage
        .from('images')
        .getPublicUrl(song.image_path);

    return imageData.publicUrl;
};

export default useLoadImage;
