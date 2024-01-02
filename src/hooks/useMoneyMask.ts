export const moneyMask = (value: String, options = { minimumFractionDigits: 2, }) => {
    if (typeof value !== "string") {
        throw new Error("Value must be a string");
    }
    const isNegative = value.includes("-");
    value = value.replaceAll(".", "").replace(",", "").replace(/\D/g, "");
    if (isNegative) {
        value = "-" + value;
    }
    const result = new Intl.NumberFormat("pt-BR", options).format(
        Number(value) / 100
    );
    return result;
};

export const outputMoneyMask = (value: Number, options = { minimumFractionDigits: 2, }) => {
    if (typeof value !== "number") {
        throw new Error("Value must be a number");
    }
    return new Intl.NumberFormat("pt-BR", options).format(value);
};