import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select"
import axios from 'axios';
import fakeData from '../helpers/fakeData';

export default function Select2Periode ({data, value, setValue,}) {
    console.log(data)
    // const [data, setData] = useState('')

    // const loadOption = async () => {
    //     const response = await axios.get(`http://training-bios2.kemenkeu.go.id/api/ws/ref/akun`);
    //     const data = response.data.map((item) => ({
    //       value: item.kode,
    //       label: item.kode + " " +item.uraian,
    //     }));
    //     setData(data);
    //   };
    
    const options = []
    data.map((item, index) => {
        const payload = {
            value: item["priode"],
            label: item["priode"],
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
            onChange={handleOption}
            defaultValue={value}
            // isLoading={!options.length}
            placeholder={"periode"}
            className={"w-auto"}
            required
        />
    )
}