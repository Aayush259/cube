import { ButtonProps } from "@/interfaces/interface";

const Button:React.FC<ButtonProps> = ({children, className, ...rest}) => {

    return (
        <button
            className={`w-96 max-w-full m-4 rounded-xl p-1 text-xl font-semibold duration-500 bg-sky-400 hover:bg-white hover:text-black focus:outline-sky-400 focus:bg-white focus:text-black ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
