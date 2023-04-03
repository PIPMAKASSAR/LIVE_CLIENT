import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select"
import axios from 'axios';
import fakeData from '../helpers/fakeData';
import pendapatanApi from '../api/pendapatanApi';

export default function Select2HeaderDetailBelanja ({value, setValue, uuid, reload, headerSelf}) {
    const [data, setData] = useState([])
    
    console.log(headerSelf)
    const loadOption = async () => {
        const header = await pendapatanApi.getHeaderDetail(uuid)
        if(header.length > 0) {
            const data = header.map((item) => (
                {
                    value: item["kode_akun"],
                    label: item["kode_akun"]+' - '+item["uraian"],
                }
            ));
            data.unshift({value: "-", label:"silahkan pilih header"})
            setData(data);
        } else {
            const defaultData = [{value: "-", label:"silahkan pilih header"}]
            setData(defaultData);
        }
    };
    const findValue = data.filter(element => element.value === value.value)
    
    useEffect(() => {
        loadOption()
    },[reload, value])

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