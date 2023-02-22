export default function rupiah(bilangan, prefix) {
    if(bilangan) {
        var	number_string = bilangan.toString(),
        sisa 	= number_string.length % 3,
        rupiah 	= number_string.substr(0, sisa),
        ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
            
        if (ribuan) {
            const separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }

}