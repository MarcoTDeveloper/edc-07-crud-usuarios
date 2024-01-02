import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";

type Option = {
    label: string;
    value: string;
};

type EditableCellProps = {
    getValue: any;
    row: any;
    column: any;
    table: any;
}

export function EditableCell({ getValue, row, column, table }: EditableCellProps) {
    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        tableMeta?.updateData(row.index, column.id, value);
    };

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
    };

    return columnMeta?.type === "select" ? (
        <select onChange={onSelectChange} value={initialValue}>
            {columnMeta?.options?.map((option: Option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    ) : (columnMeta?.type === "input" || columnMeta?.type === "date" || columnMeta?.type === "tel") ? (
        <input
            type={columnMeta?.inputType || "text"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            className={classNames("w-full border-none bg-transparent resize-none overflow-hidden outline-1 outline-primary-500 focus:outline-primary-500 focus:ring-0 focus:border-primary-500", {
                "text-center": columnMeta?.alignText === "center"
            })}
        />
    ) : (
        <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            className={classNames("w-full border-none bg-transparent resize-none overflow-hidden outline-1 outline-primary-500 focus:outline-primary-500 focus:ring-0 focus:border-primary-500", {
                "text-center": columnMeta?.alignText === "center"
            })}
            wrap="hard"
        />
    );

}