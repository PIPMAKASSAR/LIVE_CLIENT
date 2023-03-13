import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import Button from "./button";

import InputFieldAngka from "./inputFieldAngka";
import InputFieldUraian from "./inputFieldUraian";
import InputSelect from "./inputSelect";
import InputSelectHeader from "./inputSelectHeader";
import makApi from "../api/makApi";
import InputSelectHeaderEdit from "./inputSelectHeaderEdit";
import TextFieldNoRequired from "./textFieldNoRequred";
import InputFieldText from "./inputFieldText";
import validator from "validator";


export default function ModalEditMak ({showModal, setShowModal, data, reload, setReload}) {

    
    const dispatch = useDispatch()
    const headersMak = useSelector(state => state.mak.listHeader)
    const MySwal = withReactContent(Swal)
    const {uuid, jenis, kode_up, mak, uraian} = data
    const [uuId, setUuId] = useState("")
    const [jenisMak, setJenisMak] = useState("")
    const [header, setHeader] = useState("")
    const [kodeMak, setKodeMak] = useState("-")
    const [uraianMak, setUraianMak] = useState("")
    const [validKodeMak, setValidKodeMak] = useState(null)
    const [validUraian, setValidUraian] = useState(null)
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
    const [loading, setLoading] = useState(false)

    const handleEdit = (event) => {
        event.preventDefault()
        setLoading(true)
        if (/select|insert|update|delete|drop table|create table|alter table/i.test(kodeMak)) {
            setValidKodeMak("Mak tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}\%&@!$#^|\\*?"=]/i.test(kodeMak)) {
            setValidKodeMak("Mak tidak boleh memakai simbol");
            setLoading(false)
        } else if (/select|insert|update|delete|drop table|create table|alter table/i.test(uraian)) {
            setValidUraian("uraian tidak bisa berupa SQL");
            setLoading(false)
        } else if (/[<>{}\%&@!$#^|\\*?"=]/i.test(uraian)) {
            setValidUraian("uraian tidak boleh memakai simbol");
            setLoading(false)
        } else {
            if(jenisMak.value === "detail") {
                setKodeMak("-")
            }
            const payload = {
                uuId: uuId,
                jenis: jenisMak.value,
                kodeMak: kodeMak,
                kodeUp: header,
                uraian: uraianMak,
            }
            dispatch(makApi.putMak(payload))
            .then(() => {
                setLoading(false)
                setReload(!reload)
                setValidKodeMak(null)
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

    useEffect(() => {
        const jenisDataMak = {
            value:jenis,
            label:jenis 
        }
        console.log(jenisDataMak)
        dispatch(makApi.getMakHeader())
        setUuId(uuid)
        setUraianMak(uraian)
        setJenisMak(jenisDataMak)
        setKodeMak(mak)
        setHeader(kode_up)
    },[data])
    
    return data ? (
        <div 
            id="popup-modal" 
            tabIndex="-1" 
            className={`
                        overflow-y-auto 
                        overflow-x-hidden
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
                        flex
                        ${!showModal ? "hidden" : null}
                        `} 
            aria-modal="true" 
            role="dialog"
        >
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
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
                        <div className={` p-6`}>
                            <form className="w-full flex flex-col flex-nowrap" onSubmit={handleEdit}>
                                <InputSelect title={"Jenis"} data={jenisData} value={jenisMak} setValue={setJenisMak} />
                                {/* <InputSelectHeader title={"Header"} defaultValue={"Pilih Header"} value={header} setValue={setHeader} category={"header"} data={headersMak} /> */}
                                <InputSelectHeaderEdit title={"Header"} defaultValue={"Pilih Header"} value={header} setValue={setHeader} category={"header"} data={headersMak} />
                                {
                                    jenisMak.value !== "detail" ?
                                    <InputFieldText title={"Kode MAK"} value={kodeMak} setValue={setKodeMak} isError={validKodeMak} />
                                    :
                                    <TextFieldNoRequired title={"Kode MAK"} value={kodeMak} setValue={setKodeMak} isError={validKodeMak} />
                                }
                                <InputFieldUraian title={"Uraian"} value={uraianMak} setValue={setUraianMak} isError={validUraian} />
                                <Button type="submit" title="Edit" width={"w-full"} isLoading={loading} />
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
    : <span>Loading</span>
}