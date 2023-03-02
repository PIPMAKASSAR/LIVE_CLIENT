import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select"
import axios from 'axios';
import fakeData from '../helpers/fakeData';

export default function Select2Rekening ({value, setValue,}) {
    const [data, setData] = useState('')

    // const loadOption = async () => {
    //     const response = await axios.get(`http://training-bios2.kemenkeu.go.id/api/ws/ref/akun`);
    //     const data = response.data.map((item) => ({
    //       value: item.kode,
    //       label: item.kode + " " +item.uraian,
    //     }));
    //     setData(data);
    //   };
    
    const options = []
    fakeData.fakeRekening.map((data, index) => {
        const payload = {
            value: 
            {
                kode: data["kode"],
                uraian: data["uraian"]
            },
            label: data["kode"] + " - " + data["uraian"],
        }
        options.push(payload)
    })
    
    // useEffect(() => {
    //     loadOption()
    // },[])

    const handleOption = (value) => {
        setValue(value)
    }
    return (
        <Select 
            options={options}
            value={value}
            className="basic-single"
            onChange={handleOption}
            isLoading={!options.length}
            required
        />
    )
}