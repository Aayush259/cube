import ViewInArIcon from '@mui/icons-material/ViewInAr';
import Navbar from './Navbar';

export default function Header() {
    return (
        <header
            className="px-6 sm:pr-8 sm:pl-14 py-2 border-b border-[#cbd5e11a] flex flex-row items-center justify-between flex-wrap sticky top-0 left-0 z-50 bg-gradient-to-r from-black/50 to-[#011753]/80 backdrop-blur-sm"
        >
            <h1
                className="font-semibold text-xl sm:text-4xl flex items-center justify-center gap-2 sm:gap-4"
            >
                <ViewInArIcon className="sm:scale-[1.8]" />
                Cube
            </h1>

            <Navbar />
        </header>
    );
};
