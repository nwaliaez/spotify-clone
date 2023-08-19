'use clietn';
import uniqid from 'uniqid';
import { FC, useState } from 'react';
import Modal from './Modal';
import useUploadModal from '@/hooks/useUploadModal';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { toast } from 'react-hot-toast';
import { useUser } from '@/hooks/useUser';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

interface UploadModalProps {}

const UploadModal: FC<UploadModalProps> = ({}) => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean) => {
        if (!open) {
            // Reset the form
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields');
                return;
            }

            const uniqueId = uniqid();

            // Upload song
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from('songs')
                    .upload(`song-${values.title}-${uniqueId}`, songFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload.');
            }

            // Upload Image
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from('images')
                    .upload(`image-${values.title}-${uniqueId}`, imageFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload.');
            }

            const { error: supabaseError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path,
                });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />
                <div>
                    <div className="pb-1 ">Select a song file</div>
                    <Input
                        id="song"
                        disabled={isLoading}
                        type="file"
                        {...register('song', { required: true })}
                        accept=".mp3"
                    />
                </div>
                <div>
                    <div className="pb-1 ">Select an image</div>
                    <Input
                        id="image"
                        disabled={isLoading}
                        type="file"
                        {...register('image', { required: true })}
                        accept="image/*"
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
};

export default UploadModal;
