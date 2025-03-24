interface ButtonInterface {
    type?: string,
    text?: string,
    status?: string,
    bgColor?: string,
    style?: string,
    handleClick?: () => void,
    typeButton?: "button" | "submit" | "reset",
    disabled?: boolean,
    icon?: React.ReactNode,
    loading?: boolean // Added loading prop
}

const Button = ({
    type,
    typeButton = "button",
    text,
    status,
    handleClick,
    style,
    disabled = false,
    icon,
    loading = false // Added loading with default false
}: ButtonInterface) => {
    // Combine disabled and loading states
    const isDisabled = disabled || loading

    switch (type) {
        case "outline-with-icon":
            return (
                <button
                    type={typeButton}
                    onClick={isDisabled ? () => null : handleClick}
                    className={`w-full flex items-center h-max px-[20px] py-[12px] bg-transparent border border-slate-300 rounded-lg text-center outline-0 ${isDisabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:brightness-[92%] active:scale-[0.97]'} ${style}`}
                    disabled={isDisabled}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            </svg>
                            Loading...
                        </span>
                    ) : (
                        <>
                            {icon}
                            <p className="ml-4">{text}</p>
                        </>
                    )}
                </button>
            )
        case "outline":
            return (
                <button
                    type={typeButton}
                    onClick={isDisabled ? () => null : handleClick}
                    className={`w-full h-max px-[20px] py-[12px] bg-transparent border border-slate-300 rounded-lg text-center outline-0 ${isDisabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:brightness-[92%] active:scale-[0.97]'} flex items-center justify-center ${style}`}
                    disabled={isDisabled}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            </svg>
                            Loading...
                        </span>
                    ) : (
                        text
                    )}
                </button>
            )
        default:
            return (
                <button
                    type={typeButton}
                    onClick={isDisabled ? () => null : handleClick}
                    className={`${style} shadow-lg h-max px-[20px] py-[12px] 
                        ${status === 'primary' && !isDisabled
                            ? "bg-blue-500 hover:brightness-[92%] active:scale-[0.97] cursor-pointer"
                            : status === 'white' && !isDisabled
                                ? "bg-white text-blue-500 hover:brightness-[92%] active:scale-[0.99] cursor-pointer"
                                : status === 'delete' && !isDisabled
                                    ? "bg-red-400 hover:brightness-[92%] active:scale-[0.99] cursor-pointer"
                                    : "bg-slate-300 cursor-not-allowed"
                        } ${status === 'primary' && !isDisabled
                            ? "text-white"
                            : status === 'delete' && !isDisabled
                                ? "text-white"
                                : "text-slate-500"
                        } rounded-full text-center border-0 outline-0 flex items-center justify-center`}
                    disabled={isDisabled}
                >
                    {loading ? (
                        <span className="flex items-center">
                            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                            </svg>
                            Loading...
                        </span>
                    ) : (
                        text
                    )}
                </button>
            )
    }
}

export default Button