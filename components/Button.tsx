export default function Button({
    children,
    className,
    onClick,
    type,
}: {
    onClick?: (e?: any) => any;
    className?: string;
    children: React.ReactNode;
    type?: "button" | "submit";
}) {
    return (
        <button
            type={type || "button"}
            className={
                "text-white mt-4 hover:bg-white border-black bg-black md:text-xl  hover:text-black duration-150 border " +
                className
            }
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
        >
            {children}
        </button>
    );
}
