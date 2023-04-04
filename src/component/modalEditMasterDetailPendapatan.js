import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "./button";
import pendapatanApi from "../api/pendapatanApi";
import InputFieldAngka from "./inputFieldAngka";
import InputFieldText from "./inputFieldText";
import validator from "validator";
import normalizeBayar from "../helpers/normalizeBayar";
import Select2HeaderDetailBelanja from "./select2HeaderDetailBelanja";
import InputSelect from "./inputSelect";
import handleChangeRupiah from "../helpers/handleChangRupiah";


export default function ModalEditMasterDetailPendapatan({showModal, uuidParent, setShowModal, data, reload, setReload}) {
    const MySwal = withReactContent(Swal)
    const [uuid, setUuid] = useState("")
    const [jenis, setJenis] = useState({value:"header",label:"header"})
    const [header, setHeader] = useState({value:"-", label:"silahkan pilih header"})
    const [uraian, setUraian] = useState("")
    const [kodeAkun, setKodeAkun] = useState("")
    const [harga, setHarga] = useState("0")
    const [loading, setLoading] = useState(false)
    const [headerSelf, setHeaderSelf] = useState({value:"-"})
    const jenisData = [
        {
            value:"header",
            label:"header"
        }, 
        {
            value:"detail",
            label:"detail"
        }
    ]
    const [validUraian, setValidUraian] = useState("")

    const handleEdit = async (event) => {
        try {
            event.preventDefault()
            setLoading(true)
            setValidUraian("")
            if(jenis.value === 'detail' && header.value === '-'){
                setLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Maaf, Detail harus mempunyai kode header",
                });
            } else if (!validator.isLength(uraian, { min: 2 })) {
                setValidUraian("Uraian minimal panjang 2 huruf");
                setLoading(false)
            } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
                setValidUraian("Uraian tidak bisa berupa SQL");
                setLoading(false)
            } else if (/[<>{}%@!$#^|*?"'=]/i.test(uraian)) {
                setValidUraian("Uraian tidak boleh memakai simbol");
                setLoading(false)
            } else {
                const payload = {
                    uuid : uuid,
                    jenis: jenis.value,
                    kodeUp: header.value,
                    kodeAkun: kodeAkun,
                    uraian: uraian,
                    harga: normalizeBayar(harga),
                }
                const result = await pendapatanApi.updateDetailPendapatan(payload)
                if(result.status) {
                    setLoading(false)
                    setReload(!reload)
                    MySwal.fire({
                        icon: "success",
                        title: result.message, 
                    })
                }
                else {
                    setLoading(false)
                    MySwal.fire({
                        icon: "error",
                        title: "Gagal Menambahkan detail pendpatan belanja",
                    });
                }
            }
        }
        catch(error) {
            console.log(error)
            setLoading(false)
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }
    
    useEffect(() => {
        console.log('ini d modal' ,data['uuid'])
        setUuid(data['uuid'])
        setUraian(data["uraian"])
        setJenis({value:data["jenis"],label: data["jenis"]})
        setHeader({value:data["kode_up"]})
        setKodeAkun(data["kode_akun"])
        setHeaderSelf({value:data["kode_akun"]})
        setHarga(data["tarif"])
        setValidUraian(null)
    },[data])
    
    return data ? (
        <div 
            id="popup-modal" 
            tabIndex="-1" 
            className={`
                        overflow-x-hidden 
                        overflow-y-auto
                        bg-slate-400/40 
                        fixed 
                        top-0 
                        right-0 
                        left-0 
                        z-50 
                        md:inset-0 
                        h-modal 
                        md:h-full 
                        justify-center 
                        items-center 
                        w-full  
                        flex
                        ${!showModal ? "hidden" : null}
                        `} 
            aria-modal="true" 
            role="dialog"
        >
            <div className="relative p-4 w-1/2 h-auto ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button type="button" 
                            className="
                                        absolute 
                                        top-3 
                                        right-2.5 
                                        text-gray-400 
                                        bg-transparent 
                                        hover:bg-gray-200 
                                        hover:text-gray-900 
                                        rounded-lg 
                                        text-sm 
                                        p-1.5 
                                        ml-auto 
                                        inline-flex 
                                        items-center 
                                        dark:hover:bg-gray-800 
                                        dark:hover:text-white
                                        " 
                            data-modal-toggle="popup-modal"
                           onClick={() => setShowModal(false)}
                    >
                        <svg 
                                aria-hidden="true" 
                                className="w-5 h-5" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                    fillRule="evenodd" 
                                    d="
                                        M4.293 4.293a1 
                                        1 
                                        0 
                                        011.414 
                                        0L10 
                                        8.586l4.293-4.293a1 
                                        1 
                                        0 
                                        111.414 
                                        1.414L11.414 
                                        10l4.293 
                                        4.293a1 
                                        1 
                                        0 
                                        01-1.414 
                                        1.414L10 
                                        11.414l-4.293 
                                        4.293a1 
                                        1 
                                        0 
                                        01-1.414-1.414L8.586 
                                        10 
                                        4.293 
                                        5.707a1 
                                        1 
                                        0 
                                        010-1.414z" 
                                    clipRule="evenodd">
                            </path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                        <div className={` p-6 `}>
                            <form className="w-full flex flex-col flex-nowrap" onSubmit={handleEdit}>
                                <InputSelect title={"jenis"} data={jenisData} value={jenis} setValue={setJenis} />
                                <div className={`mb-6 w-full`}>
                                    <label htmlFor="KodeAkun" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Header</label>  
                                    <Select2HeaderDetailBelanja value={header} setValue={setHeader} uuid={uuidParent} />
                                </div>
                                <InputFieldText title={"Kode Akun"} value={kodeAkun} setValue={setKodeAkun} />
                                <InputFieldText title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} />
                                {
                                    jenis.value === "detail" ?
                                    <div className="mb-6 w-full">
                                        <label htmlFor="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                                        <input 
                                                type="text" 
                                                id="harga" 
                                                className="
                                                            block 
                                                            w-full 
                                                            p-2 
                                                            text-gray-900 border 
                                                            border-gray-300 
                                                            rounded-lg 
                                                            bg-gray-50 
                                                            sm:text-xs 
                                                            focus:ring-blue-500 
                                                            focus:border-blue-500 
                                                        "
                                                value={harga}
                                                onChange={(e) => setHarga(handleChangeRupiah(e.target.value))}
                                        />
                                        <p className="mt-2 text-sm"><span className="font-medium">Exp:Rp. 570.000</span> Input harus berupa angka</p>
                                    </div>
                                    :
                                    null
                                }
                                <Button type="Simpan" title="Edit" width={"w-full"} isLoading={loading} />
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
    : <span>Loading</span>
}