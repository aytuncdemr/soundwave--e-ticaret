import clsx from "clsx";

export default function Button({
    children,
    className = "",
    onClick,
    type = "button",
}: {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children: React.ReactNode;
    type?: "button" | "submit";
}) {
    return (
        <button
            type={type}
            className={clsx(
                "text-white mt-4 hover:bg-white border-black bg-black md:text-xl hover:text-black duration-150 border",
                className
            )}
            onClick={(e) => onClick?.(e)}
        >
            {children}
        </button>
    );
}
