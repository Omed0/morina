export function formatPrice(value, currencyType) {
    value = String(value);
    // Split the value into integer and decimal parts
    const [integerPart, decimalPart] = value.split(".");

    // Add commas to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the integer part and decimal part (if exists) with the appropriate formatting
    const formattedValue = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

    if (formattedValue === "0") {
        return " ";
    }

    // Use a switch case to return the formatted value based on the currency type
    switch (currencyType) {
        case "IQD":
            return `${formattedValue}`;
        case "$":
            return `$${formattedValue}`;
        case "IRR":
            return `${formattedValue} IRR`;
        case "TRY":
            return `₺${formattedValue}`;
        case "EUR":
            return `€${formattedValue}`;
        default:
            return formattedValue; // Return as is if the currency type is not recognized
    }
}