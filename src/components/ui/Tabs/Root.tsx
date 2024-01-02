type TabLinkProps = {
    children: React.ReactNode;
}

export function TabsRoot({ children }: TabLinkProps) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-center text-gray-500 dark:text-gray-400">
                {children}
            </ul>
        </div>
    );
}