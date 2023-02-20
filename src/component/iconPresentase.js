import {MdTrendingDown, MdTrendingUp} from "react-icons/md"

export default function IconPresentase({keterangan}) {
    return(
        <>
             {
                keterangan === "Lebih Kecil Dari Bulan Lalu" ?
                <MdTrendingDown className="mr-2 text-xs md:text-md lg:text-lg text-red-400" />
                :
                <MdTrendingUp className="mr-2 text-xs md:text-md lg:text-lg text-green-400" />
            }
        </>
    )
}