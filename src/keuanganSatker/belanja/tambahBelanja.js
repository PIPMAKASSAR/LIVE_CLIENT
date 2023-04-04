import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import BreadCump from "../../component/breadCump"
import InputFieldAngka from "../../component/inputFieldAngka"
import InputFieldText from "../../component/inputFieldText"
import Button from "../../component/button"
import routeName from "../../helpers/routeName"
import InputSelectHeader from "../../component/inputSelectHeader";
import Select2PihakTiga from "../../component/select2PihakTiga";
import InputFieldRupiah from "../../component/inputFieldRupiah";
import InputMakById from "../../component/inputMakById";

import makApi from "../../api/makApi";
import penerimaanPihakTigaApi from "../../api/penerimaanPihakTigaApi";
import satkerApi from "../../api/satkerApi";
import belanjaApi from "../../api/belanjaApi";
import normalizeBayar from "../../helpers/normalizeBayar";
import validator from "validator";
import dateFormat from "dateformat";
import autoGenerateKodetransaksi from "../../helpers/autoGenerateKodetransaks";

export default function TambahBelanja() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dataMak = useSelector(state => state.mak.listHeader)
    const [dataPihakTiga, setDataPihakTiga] = useState([])
    const [tanggal, setTanggal] = useState("")
    const [kodeTransaksi, setKodeTransaksi] = useState("")
    const [mak, setMak] = useState("")
    const [penerima, setPenerima] = useState("")
    const [uraian, setUraian] = useState("")
    const [nilai, setNilai] = useState("")
    const [ppn,setPpn]  = useState(0)
    const [pph21, setPph21] = useState(0)
    const [pph22, setPph22] = useState(0)
    const [pph23, setPph23] = useState(0)
    const [pphFinal, setPphFinal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [validUraian, setValidUraian] = useState(null)
    const [periodeDef, setPeriodeDef] = useState({
        value: "",
        label: "",
    })
    const titlesBreadCump = [ "Master","Belanja"]

    const handleKembali = () => {
        navigate(routeName.belanja)
    }

    const handleTambah = async (event) => {
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
            const nilaiImputan = normalizeBayar(nilai)
            const periodeMak = {
                periode: periodeDef.value,
                mak: mak.value
            }
            const resultSatker = await belanjaApi.getSatketMak(periodeMak)
            if(!resultSatker) {
                setLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Mak tidak ditemukan di satuan kerja",
                });
            } else if(parseInt(nilaiImputan) > parseInt(resultSatker["total_nilai"])) {
                // const nilai1 = parseInt(nilaiImputan)
                // const nilai2 = parseInt(resultSatker[0]["total_nilai"])
         
                setLoading(false)
                MySwal.fire({
                    icon: "error",
                    title: "Nilai yang anda masukkan melebihi nilai total ketentuan",
                });
            } 
            else {
                const payload = {
                    "tanggal": dateFormat(tanggal, "isoDate"),
                    "kodeTransaksi": kodeTransaksi,
                    "mak": mak.value,
                    "penerima": penerima.value,
                    "uraian": uraian,
                    "jumlah": normalizeBayar(nilai),
                    "ppn" : ppn !== 0 ? normalizeBayar(ppn) : 0,
                    "pph21": pph21 !== 0 ? normalizeBayar(pph21) : 0,
                    "pph22": pph22 !== 0 ?normalizeBayar(pph22) : 0,
                    "pph23": pph23 !== 0 ?normalizeBayar(pph23) : 0,
                    "pphfinal": pphFinal !== 0 ? normalizeBayar(pphFinal) : 0,
                }
                dispatch(belanjaApi.postBelanja(payload))
                .then(() => {
                    setLoading(false)
                    setTanggal("")
                    setKodeTransaksi("")
                    setMak("")
                    setNilai("")
                    setPenerima("")
                    setUraian("")
                    setPpn("")
                    setPph21("")
                    setPph22("")
                    setPph23("")
                    setPphFinal("")
                    setValidUraian(null)
                    MySwal.fire({
                        icon: "success",
                        title: "Data Belanja Berhasil Ditambahkan",
                    })
                })
                .catch((err) => {
                    setLoading(false)
                    MySwal.fire({
                        icon: "error",
                        title: "Gagal Menambahkan Belanja",
                    });
                    
                })
            }
        }

    }

    const ambilPihakTiga = async () => {
        penerimaanPihakTigaApi.getListPihakTiga()
        .then((result) => {
            setDataPihakTiga([...result])
        })
    }
    const getPeriode = async () => {
        try {
            const result = await satkerApi.getPeriodeSatker()
            if(result) {
                console.log("status true")
                result.map((item)=> {
                    if(item["status_priode"] === "true") {
                        const payload = {
                            value: item["priode"],
                            label: item["priode"],
                        }
                        setPeriodeDef(payload)
                    }
                })
            }
            return result
        }
        catch (err) {
            console.log(err)
            MySwal.fire({
                icon: "error",
                title: "Gagal Mengambil Data Periode Satuan Kerja",
              });
        }
    }
    
    const handleKodeTransaksi = async (data) => {
        try {
            let kodeCreate = null
            const type = "belanja"
            const result = await belanjaApi.getLastKodeTransaksi()
            if(result.length > 0) {
                const splitKode = result[0]["kode_transaksi"].split('/')
                const num = splitKode[3]
                kodeCreate = autoGenerateKodetransaksi(num, data, type)
                setKodeTransaksi(kodeCreate)
            } else {
                kodeCreate = autoGenerateKodetransaksi("0000", data, type)
                setKodeTransaksi(kodeCreate)

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
        dispatch(makApi.getMakHeader())
        ambilPihakTiga()
        getPeriode()
    }, [])

    return(
        <div className="p-4 w-full h-full overflow-y-auto" >
            <div className="p-4 rounded-lg mt-14 " >
                <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 p-4 mb-4 rounded bg-gray-50">
                    <h1 className="text-lg font-extrabold dark:text-white">Tambah Belanja</h1>
                    <BreadCump titles={titlesBreadCump} />
                </div>
                <div className="flex flex-col h-auto  p-9 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="mb-5">
                        <Button title={"Kembali"} color={"red"} handleFunction={handleKembali} />
                    </div>
                    <div className="lg:mx-72">
                        <form onSubmit={handleTambah} >
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
                            <InputSelectHeader title={"Mak"} defaultValue={"Pilih Header"} value={mak} setValue={setMak} data={dataMak} />
                            {/* <InputMakById title={"Mak"} defaultValue={"Pilih Header"} value={mak} setValue={setMak} data={dataMak} /> */}
                            <Select2PihakTiga data={dataPihakTiga} title={"Penerima"} value={penerima} setValue={setPenerima} />
                            <InputFieldText title={"Uraian"} value={uraian} setValue={setUraian} isError={validUraian} />
                            <div className="grid grid-cols-2 gap-4">
                                <InputFieldRupiah title={"Nilai"} value={nilai} setValue={setNilai} />
                                <InputFieldRupiah title={"PPN"} value={ppn} setValue={setPpn}  />
                                <InputFieldRupiah title={"PPH 21"} value={pph21} setValue={setPph21} />
                                <InputFieldRupiah title={"PPH 22"} value={pph22} setValue={setPph22} />
                                <InputFieldRupiah title={"PPH 23"} value={pph23} setValue={setPph23} />
                                <InputFieldRupiah title={"PPH Final"} value={pphFinal} setValue={setPphFinal} />
                            </div>
                            <Button type="submit" title="Tambah Belanja" width={"w-full"} isLoading={loading} />
                        </form>
                    </div>   
                </div>
            </div>
        </div>
    )
}