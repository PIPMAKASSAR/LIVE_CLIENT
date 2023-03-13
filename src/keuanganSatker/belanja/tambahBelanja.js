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

export default function TambahBelanja() {
    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dataMak = useSelector(state => state.mak.listHeader)
    const [dataPihakTiga, setDataPihakTiga] = useState([])
    const [mak, setMak] = useState("")
    const [penerima, setPenerima] = useState("")
    const [uraian, setUraian] = useState("")
    const [nilai, setNilai] = useState("")
    const [ppn,setPpn]  = useState("")
    const [pph21, setPph21] = useState("")
    const [pph22, setPph22] = useState("")
    const [pph23, setPph23] = useState("")
    const [pphFinal, setPphFinal] = useState("")
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
                    "mak": mak.value,
                    "penerima": penerima.value,
                    "uraian": uraian,
                    "jumlah": normalizeBayar(nilai),
                    "ppn" : normalizeBayar(ppn),
                    "pph21": normalizeBayar(pph21),
                    "pph22": normalizeBayar(pph22),
                    "pph23": normalizeBayar(pph23),
                    "pphfinal": normalizeBayar(pphFinal),
                }
                dispatch(belanjaApi.postBelanja(payload))
                .then(() => {
                    setLoading(false)
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