export default function normalizeBayar (nilai) {
    if(nilai) {
        const arr = nilai.split('.').join('')
        const filter = parseInt(arr.toString().replace(/[^0-9]/g, ''));
        return filter
    }
}