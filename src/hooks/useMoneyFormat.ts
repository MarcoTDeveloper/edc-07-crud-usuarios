export function useMoneyFormat(value: number | string) {
    const moneyFormat = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    return moneyFormat.format(Number(value));
}

export function MoneyFormat(value: number | string) {
    let moneyFormatted = useMoneyFormat(value);
    return moneyFormatted;
}

export function StringMoneyToNumber(value: string) {
    let newValue = value.replace("R$", "").trim();

    if (newValue.includes(".") && newValue.includes(",")) {
        newValue = newValue.replaceAll(".", "").replace(",", ".");
    } else if (newValue.includes(".") && !newValue.includes(",")) {
        newValue = newValue.replaceAll(".", "");
    } else if (!newValue.includes(".") && newValue.includes(",")) {
        newValue = newValue.replace(",", ".");
    }

    return Number(newValue);
}