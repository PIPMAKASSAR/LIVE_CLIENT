import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select"
import keuanganPendapatanApi from '../api/keuanganPendapatanApi';
import handleChangeRupiah from '../helpers/handleChangRupiah';
import rupiah from '../helpers/rupiah';


export default function Select2DetailBelanja ({value, setValue, setHarga, setUraian, reload, headerSelf}) {
    const [data, setData] = useState([])
    
    const loadOption = async () => {
        const detail = await keuanganPendapatanApi.getListDetailPendapatanBelanja()

        if(detail.length > 0) {
            const data = detail.map((item) => (
                {
                    value: item["kode_akun"],
                    label: item["kode_akun"]+ ' - ' +item["uraian"],
                    tarif: item["tarif"],
                    uraian: item["uraian"],
                }
            ));
            data.unshift({value: "", label:"silahkan pilih kode akun", tarif:"0"})
            setData(data);
        } else {
            const defaultData = [{value: "", label:"silahkan pilih kode akun", tarif:"0"}]
            setData(defaultData);
        }
    };
    const findValue = data.filter(element => element.value == value.value)
    
    useEffect(() => {
        loadOption()
    },[reload])

    const handleOption = (value) => {
        setValue(value)
        setHarga(value.tarif)
        setUraian(value.uraian)
    }
    return (
        <Select 
            options={data}
            value={findValue}
            className="basic-single"
            onChange={handleOption}
            isLoading={!data.length}
            required
        />
    )
}