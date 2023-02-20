import AngkaDashboard from "../helpers/angkaDashboard"
import AngkaDashboard2 from "../helpers/angkaDashboard2"
import IconPresentase from "./iconPresentase"

export default function CardDashboard({title, Icon, color, iconSize, data, sizeFontJudul, sizeFontDetail, }) {
    console.log("ini d cardboard", data)
    return(
        <div className="flex flex-col rounded bg-gray-50 h-auto p-9 dark:bg-gray-800">
            <h3 className={`${sizeFontJudul} font-bold dark:text-white`}>
                {title}
            </h3>
            <div className="flex items-center justify-between">
                <div className={`text-${color}-400`}>
                    {/* <AngkaDashboard nilai={data['penerimaan_bulan_ini']} /> */}
                </div>
                    <div className={`font-bold ${sizeFontDetail }`}>
                        <span>Bulan lalu</span>
                        {/* {
                            data ?
                            <AngkaDashboard2 nilai={data["penerimaan_bulan_lalu"]} keterangan={data["keterangan"]} />
                            :
                            "0"
                        } */}
                    </div>
                <Icon 
                                className={` 
                                object-cover 
                                text-${color}-400
                                ${iconSize} 
                                md:h-auto 
                                md:w-28 
                                md:rounded-none 
                                md:rounded-l-lg
                                `} 
                />
            </div>
            <div className="flex items-center">
                <IconPresentase keterangan={data["keterangan"]} />
                <span>{data["persentase"]} {data["keterangan"]}</span>
            </div>
        </div>
               
    )
}