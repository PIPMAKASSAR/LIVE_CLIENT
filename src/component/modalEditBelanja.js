import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "./button";
import makApi from "../api/makApi";
import penerimaanPihakTigaApi from "../api/penerimaanPihakTigaApi";
import belanjaApi from "../api/belanjaApi";
import InputSelectHeaderEdit from "./inputSelectHeaderEdit";
import Select2PihakTigaEdit from "./Select2PihakTigaEdit";
import InputFieldRupiah from "./inputFieldRupiah";
import InputFieldText from "./inputFieldText";
import normalizeBayar from "../helpers/normalizeBayar";
import handleChangeRupiah from "../helpers/handleChangRupiah";
import validator from "validator";
import dateFormat from "dateformat";


export default function ModalEditBelanja ({showModal, setShowModal, data, reload, setReload}) {
    const dispatch = useDispatch()
    const MySwal = withReactContent(Swal)
    const dataMak = useSelector(state => state.mak.listHeader)
    const [tanggal, setTanggal] = useState("")
    const [kodeTransaksi, setKodeTransaksi] = useState("")
    const [uuid,setUuid] = useState("")
    const [mak, setMak] = useState("")
    const [penerima, setPenerima] = useState({value:"-", label:"silahkan pilih penerima"})
    const [uraian, setUraian] = useState("")
    const [nilai, setNilai] = useState("")
    const [ppn,setPpn]  = useState("")
    const [pph21, setPph21] = useState("")
    const [pph22, setPph22] = useState("")
    const [pph23, setPph23] = useState("")
    const [pphFinal, setPphFinal] = useState("")
    const [validUraian, setValidUraian] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleEdit = (event) => {
        event.preventDefault()
        setLoading(true)
        if (!validator.isLength(uraian, { min: 2 })) {
            setValidUraian("uraian minimal panjang 2 huruf");
            setLoading(false)
        } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
            setValidUraian("uraian tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}()[\]%&@!$#^|\\/*?"=]/i.test(uraian)) {
            setValidUraian("uraian tidak boleh memakai simbol");
            setLoading(false)
        } else {
            const payload = {
                "uuid": uuid,
                "tanggal" : dateFormat(tanggal, "isoDate"),
                "kodeTransaksi": kodeTransaksi,
                "mak": mak,
                "penerima": penerima.value,
                "uraian": uraian,
                "jumlah": normalizeBayar(nilai),
                "ppn" : normalizeBayar(ppn),
                "pph21": normalizeBayar(pph21),
                "pph22": normalizeBayar(pph22),
                "pph23": normalizeBayar(pph23),
                "pphfinal": normalizeBayar(pphFinal),
            }
            belanjaApi.editBelanja(payload)
            .then(() => {
                setLoading(false)
                setReload(!reload)
                setValidUraian(null)
                MySwal.fire({
                    icon: "success",
                    title: "Data Penerimaan Berhasil Di Edit",
                })
            })
            .catch((err) => {
                setLoading(false)
                setReload(!reload)
                MySwal.fire({
                    icon: "error",
                    title: "Gagal Mengedit Data Penerimaan",
                });
            })
        }
    }

    async function getRomanNumeral(num) {
        const romanNumerals = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
        return romanNumerals[num];
    }
    
    async function dateWithRomanMonth(date) {
        const month = await getRomanNumeral(date.getMonth() + 1); // getMonth() returns 0-based index
        const day = date.getDate();
        const year = date.getFullYear();
        return {
            month,
            year
        }
    }

    const handleKodeTransaksi = async (data) => {    
        try {
            const date = new Date(data)
            const romawi = await dateWithRomanMonth(date)
            if(romawi && kodeTransaksi) {
                const arr = kodeTransaksi.split('/')
                arr[1] = romawi.month
                arr[2] = romawi.year
                setKodeTransaksi(arr.join('/'))
            }
            setTanggal(data)
        }
        catch(error) {
            console.log(error)
            MySwal.fire({
                icon: "error",
                title: error.message,
            });
        }
    }
    
    useEffect(() => {
        setUuid(data['uuid'])
        setMak(data["mak"])
        setTanggal(dateFormat(data["tanggal"], "yyyy-mm-dd"))
        setKodeTransaksi(data["kode_transaksi"])
        setNilai(handleChangeRupiah(data["jumlah"]))
        setPenerima({value:data["penerima"]})
        setUraian(data["uraian"])
        setPpn(handleChangeRupiah(data["ppn"]))
        setPph21(handleChangeRupiah(data["pajak_pph21"]))
        setPph22(handleChangeRupiah(data["pajak_pph22"]))
        setPph23(handleChangeRupiah(data["pajak_pph23"]))
        setPphFinal(handleChangeRupiah(data["pajak_pphfinal"]))
        dispatch(makApi.getMakHeader())
    },[data])

    useEffect(() => {
        dispatch(makApi.getMakHeader()) 
    }, [])
    
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
                                <div className="flex gap-5">
                                    <div className="mb-6">
                                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal Transaksi</label>
                                        <div className="relative max-w-sm">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                            </div>
                                            <input 
                                                    type="date" 
                                                    className="
                                                                bg-gray-50 
                                                                border 
                                                                border-gray-300 
                                                                text-gray-900 
                                                                text-sm 
                                                                rounded-lg 
                                                                focus:ring-blue-500 
                                                                focus:border-blue-500 
                                                                block 
                                                                mx:w-48  
                                                                pl-10 
                                                                p-2.5 
                                                                " 
                                                    placeholder="Select date"
                                                    value={tanggal}
                                                    onChange={(e) => {handleKodeTransaksi(e.target.value)}} 
                                                    required
                                            />
                                        </div>
                                    </div> 
                                    <div className="mb-6 mx-w-xl">
                                        <label htmlFor="kodeTransaksi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Transaksi:</label>
                                        <input 
                                                type="text" 
                                                id="kodeTransaksi" 
                                                className="
                                                            block 
                                                            w-full 
                                                            p-3 
                                                            text-gray-900 border 
                                                            border-gray-300 
                                                            rounded-lg 
                                                            bg-gray-50 
                                                            sm:text-xs 
                                                            focus:ring-blue-500 
                                                            focus:border-blue-500 
                                                        "
                                                value={kodeTransaksi}
                                                disabled
                                                required
                                        />
                                    </div>
                                </div>
                                <InputSelectHeaderEdit title={"Mak"} defaultValue={"Pilih Header"} value={mak} setValue={setMak} data={dataMak} />
                                {/* <InputMakById title={"Mak"} defaultValue={"Pilih Header"} value={mak} setValue={setMak} data={dataMak} /> */}
                                <Select2PihakTigaEdit title={"Penerima"} value={penerima} setValue={setPenerima} />
                                <InputFieldText title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputFieldRupiah title={"Nilai"} value={nilai} setValue={setNilai} />
                                    <InputFieldRupiah title={"PPN"} value={ppn} setValue={setPpn}  />
                                    <InputFieldRupiah title={"PPH 21"} value={pph21} setValue={setPph21} />
                                    <InputFieldRupiah title={"PPH 22"} value={pph22} setValue={setPph22} />
                                    <InputFieldRupiah title={"PPH 23"} value={pph23} setValue={setPph23} />
                                    <InputFieldRupiah title={"PPH Final"} value={pphFinal} setValue={setPphFinal} />
                                </div>
                                <Button type="submit" title="Edit" width={"w-full"} isLoading={loading} />
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
    : <span>Loading</span>
}