import { FC } from 'react';
interface LibraryIconProps { }
const LibraryIcon: FC<LibraryIconProps> = ({ }) => {
    return (
        <>
            <svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon"><path fill='#6a6a6a' d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"></path></svg>
        </>
    );
}
export default LibraryIcon;