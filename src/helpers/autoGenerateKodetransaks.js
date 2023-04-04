import dateFormat from "dateformat";

function getRomanNumeral(num) {
    const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
    return romanNumerals[num];
}

function dateWithRomanMonth(date) {
    const month = getRomanNumeral(date.getMonth() + 1); // getMonth() returns 0-based index
    const day = date.getDate();
    const year = date.getFullYear();
    return {
        month,
        year
    }
}

export default function autoGenerateKodetransaksi(number,tanggal, type) {
    const paddedNumber = String(number).padStart(4, '0');
    const incrementedNumber = Number(paddedNumber) + 1;
    const paddedResult = String(incrementedNumber).padStart(4, '0');
    const datenow = new Date(tanggal)
    const date = dateWithRomanMonth(datenow)
    if(type === "pendapatan") {
        const result = `PEND/${date.month}/${date.year}/${paddedResult}`
        return result;
    }  else if(type === "belanja") {
        const result = `BELA/${date.month}/${date.year}/${paddedResult}`
        return result;
    } else {
        const result = `PEND/${date.month}/${date.year}/${paddedResult}`
        return result; 
    }
}