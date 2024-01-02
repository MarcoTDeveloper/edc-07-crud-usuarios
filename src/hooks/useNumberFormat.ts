export function NumberFormat(value: string) {
    return Number(value.replaceAll(".", "").replace(",", "."));
}