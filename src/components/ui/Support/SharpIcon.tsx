import { SVGProps, Ref, forwardRef } from "react";

interface SharpIconProps extends SVGProps<SVGSVGElement> {
    size?: number;
}

const SharpIconBase = ({ size = 16, className, ...rest }: SharpIconProps, ref: Ref<SVGSVGElement>) => {
    const fillColor = className?.includes("text-") ? className.replace("text-", "") : "currentColor";

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 257 320.34"
            width={`${size}px`}
            height={`${size}px`}
            ref={ref}
            {...rest}
        >
            <style>{`.st0{fill: ${fillColor};}`}</style>
            <path
                d="M221 54.33v.19S134.21 3.84 128.31.39c-.2-.12-.31-.19-.31-.19V0L35.99 47.48v-.21l-6.05 3.06.01.14L1 65.76V86.7s32.16 22.44 32.91 22.44c.31 0 .43-10.8.46-23.31l.27-.06-.01.89.81-.38L128 42.58v.03l93 55.8v46.62l-65.82-40.39-27.67 20.94L221 186.17v.15l36 22.5V76.08l-36-21.75zM35 221.54l1-46.22 65.91 40.23 27.62-21.01-93.63-60.36v-.01L0 111.84l.3 132.44 34.8 20.91v.6s87.62 50.9 93.58 54.36c.21.12.32.18.32.18l-.1-42.76L35 221.54zm0 .14v-.01.03-.02z"
                className="st0"
            />
            <path
                d="M255.95 233.14s-32.21-22.36-32.96-22.36c-.31 0-.41 10.8-.41 23.3l-.31.08.01-.89-.81.39-92.47 43.9.1 42.58 91.9-47.7v.21l6.04-3.08-.01-.11L256 254.08l-.05-20.94z"
                className="st0"
            />
        </svg>
    );
};

export const SharpIcon = forwardRef(SharpIconBase);