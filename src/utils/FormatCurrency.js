
export const formatCurrency = (amount, showRp = true) => {
    var format = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
        .format(amount)

    if (showRp) {
        return format
            .replace(/^Rp\s*/, "Rp "); // Add space after Rp
    }
    return format .replace(/^Rp\s*/, "");

};