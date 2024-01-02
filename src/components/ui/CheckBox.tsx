import classNames from "classnames";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface CheckBoxProps extends React.HTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    type?: string;
    className?: string;
    disabled?: boolean;
    checked?: boolean;
}

const CheckBoxBase: ForwardRefRenderFunction<HTMLInputElement, CheckBoxProps> = ({ label, type, id, className, disabled = false, ...rest }, ref) => {
    if (type != undefined && type !== "checkbox") {
        throw new Error("CheckBox component must be of type checkbox");
    }

    return (
        <div className={classNames("flex items-center", className)}>
            <label htmlFor={id} className={classNames("block w-4 h-4 cursor-pointer relative [-webkit-tap-highlight-color:_transparent]", {
                "pointer-events-none": disabled,
                "opacity-60": disabled
            })}>
                <input
                    type="checkbox"
                    id={id}
                    ref={ref}
                    className="peer block outline-none border-none w-[18px] h-[18px] rounded-[36%_/_36%] bg-transparent [transition:_background_.25s_linear,_box-shadow_.25s_linear] checked:bg-primary-500 [-webkit-appearance:_none] shadow-gray-500 shadow-[inset_0_0_0_1.5px] checked:shadow-primary-500"
                    {...rest}
                />
                <svg viewBox="0 0 21 18" className="absolute w-[21px] h-[18px] left-0 top-0 text-primary-500 peer-checked:[--stroke-dashoffset:_0]"> <symbol id="tick-path" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg"> <path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" /> </symbol> <defs> <mask id={`tick-${id}`}> <use className="svg-stroke stroke-white" href="#tick-path" /> </mask> </defs> <use className="svg-stroke" href="#tick-path" stroke="currentColor" /> <path fill="white" mask={`url(#tick-${id})`} d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" /></svg>
                <svg className="absolute w-[11px] h-[11px] fill-none stroke-primary-500 svg-stroke-props top-[-6px] right-[-10px] pointer-events-none [animation:_var(--animation,_none)_.2s_ease_.175s] peer-checked:[--animation:_check]" viewBox="0 0 11 11"> <path d="M5.88086 5.89441L9.53504 4.26746" /> <path d="M5.5274 8.78838L9.45391 9.55161" /> <path d="M3.49371 4.22065L5.55387 0.79198" /> </svg>
                <span className="absolute top-0 leading-4 ml-6 mt-[2px] whitespace-nowrap opacity-80 peer-checked:opacity-100">{label}</span>
            </label>
        </div>
    );
};

export const CheckBox = forwardRef(CheckBoxBase);