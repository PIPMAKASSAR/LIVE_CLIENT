import React, { useEffect, useRef, useState } from 'react';
import Select from "react-select"
import satkerApi from '../api/satkerApi';

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Select2Periode ({value, setValue, reload}) {
    const MySwal = withReactContent(Swal)
    const [data, setData] = useState([])

    const loadOption = async () => {
        try {
            const response = await satkerApi.getPeriodeSatker();
            if(response.length > 0) {

                const data = response.map((item) => ({
                  value: item["priode"],
                  label: item["priode"]
                }));
                setData(data);
            } else {
                const defaultData = [{value: "", label:"silahkan mebuat periode",}]
                setData(defaultData);
            }
          }
          catch(err) {
            MySwal.fire({
                icon: "error",
                title: err.message,
            });
          }
    }

    const findValue = data.filter(element => element.value === value.value)
    
    useEffect(() => {
        loadOption()
    },[reload])

    const handleOption = (value) => {
        setValue(value)
    }
    return (
        <Select 
            options={data}
            value={findValue}
            onChange={handleOption}
            defaultValue={value}
            // isLoading={!options.length}
            placeholder={"periode"}
            className={"w-auto"}
            required
        />
    )
}