import classNames from "classnames";

type ThemeOptionProps = {
    theme: string;
    setTheme: (theme: string) => void;
    selected?: boolean;
}

export function ThemeOption({ theme, setTheme, selected = false }: ThemeOptionProps) {
    return (
        <label className="flex cursor-pointer font-medium relative overflow-hidden">
            <input 
                type="radio" 
                name="theme" 
                className="absolute opacity-0"
                value={theme}
                onClick={() => setTheme(theme)}
            />
            <span
                className={classNames("flex items-center py-[.375em] px-[.75em] rounded-full transition delay-200 before:flex before:flex-shrink-0 before:bg-white before:dark:bg-gray-900 before:w-4 before:h-4 before:rounded-full before:mr-[.375em] before:[transition:_.25s_ease] before:shadow-[inset_0_0_0_.125em] before:!shadow-primary-500", {
                    "bg-slate-200 dark:bg-slate-800": selected,
                    "before:!shadow-[inset_0_0_0_.3rem]": selected
                })}>
                {theme}
            </span>
        </label>
    );
}