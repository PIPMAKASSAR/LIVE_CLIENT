import {MdTrendingDown, MdTrendingUp} from "react-icons/md"


function ubahAngka(bilangan) {
    var	reverse = bilangan.toString().split('').reverse().join(''),
    ribuan 	= reverse.match(/\d{1,3}/g);
    ribuan	= ribuan.join('.').split('').reverse().join('');

    return ribuan
    
}


export default function AngkaDashboard2({nilai, keterangan}) { 
    const nilaiUbah = ubahAngka(nilai)
    
    return(
        <div className="flex items-center text-xs sm:text-sm md:text-md">
            {
                keterangan === "Lebih Kecil Dari Bulan Lalu" ?
                <MdTrendingDown className="mr-2 text-red-400" />
                :
                <MdTrendingUp className="mr-2 text-green-400" />
            }
            <div className="">
                <span>{nilaiUbah}</span>
            </div>
        </div>
    )
} 