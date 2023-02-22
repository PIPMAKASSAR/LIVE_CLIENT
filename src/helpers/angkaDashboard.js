function ubahAngka(bilangan) {
    var	reverse = bilangan.toString().split('').reverse().join(''),
	ribuan 	= reverse.match(/\d{1,3}/g);
	ribuan	= ribuan.join('.').split('').reverse().join('');

    return ribuan
   
}



export default function AngkaDashboard({nilai}) {
    const nilaiUbah = ubahAngka(nilai)
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className={`font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl`}>
                {nilai ? `Rp. ${nilaiUbah}` : "Rp. 0"}
                
            </h1>
        </div>
    )
} 