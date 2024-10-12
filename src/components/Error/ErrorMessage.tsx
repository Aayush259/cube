
const ErrorMessage: React.FC<{
    message: string,
    className?: string,
}> = ({ message, className = "" }) => {

    return (
        <p
            className={`text-red-500 text-sm text-right font-semibold ${className}`}
        >
            {message}*
        </p>
    )
};

export default ErrorMessage;
