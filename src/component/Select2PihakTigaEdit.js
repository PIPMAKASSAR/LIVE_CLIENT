import React, { useState,useEffect, useRef } from 'react';
import Select from "react-select"
import penerimaanPihakTigaApi from '../api/penerimaanPihakTigaApi';

export default function Select2PihakTigaEdit ({value, setValue,}) {
    const [data, setData] = useState([])
    
    const loadOption = async () => {
        const detail = await penerimaanPihakTigaApi.getListPihakTiga()

        if(detail.length > 0) {
            const data = detail.map((item) => (
                {
                    value: item["uuid"],
                    label: item["no_rekening"]+ ' - ' +item["nama"],
                }
            ));
            data.unshift({value: "", label:"silahkan pilih kode akun", tarif:"0"})
            setData(data);
        } else {
            const defaultData = [{value: "", label:"silahkan pilih kode akun", tarif:"0"}]
            setData(defaultData);
        }
    };
    const findValue = data.filter(element => element.value === value.value)
    
    useEffect(() => {
        loadOption()
    },[])

    const handleOption = (value) => {
        setValue(value)
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