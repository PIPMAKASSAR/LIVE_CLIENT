const dataFake = [
    {
        uuid: '1',
        "mak": '3996.AEC.002',
        uraian: 'Kerjasama dan kemitraan antar instansi dan lembaga transportasi Laut',
        jenis: "header",
        kode_up: "",
        subMak : [
            {
                uuid: '2',
                "mak": '3996.AEC.002.051',
                uraian: 'Kerjasama antar instansi pemerintah/swasta/lembaga/terkait',
                jenis: "header",
                kode_up: "3996.AEC.002",
                subMak: [
                    {
                        uuid: '3',
                        "mak": '3996.AEC.002.051',
                        uraian: 'Kerjasama dengan perusahaan pelayaran terkait penempatan taruna prala prada',
                        jenis: "header",
                        kode_up: "3996.AEC.002.051",
                        subMak: [
                            {
                                uuid: '4',
                                "mak": '3996.AEC.002.051.A.521211',
                                uraian: 'Belanja Bahan',
                                jenis: "header",
                                kode_up: "3996.AEC.002.051",
                                subMak: [
                                    {
                                        uuid: '5',
                                        "mak": '3996.AEC.002.051.A.521211.1',
                                        uraian: 'ATK Pelaporan',
                                        jenis: "detail",
                                        kode_up: "3996.AEC.002.051.A.521211",
                                    },
                                    {
                                        uuid: '6',
                                        "mak": '3996.AEC.002.051.A.521211.2',
                                        uraian: 'Komsumsi rapat 15 org x 9 reg',
                                        jenis: "detail",
                                        kode_up: "3996.AEC.002.051.A.521211",     
                                    },
                                    {
                                        uuid: '7',
                                        "mak": '3996.AEC.002.051.A.521211.3',
                                        uraian: 'Pengadaan Dokumen',
                                        jenis: "detail",
                                        kode_up: "3996.AEC.002.051.A.521211",
                                    }
                                ]
                            }
                        ] 
                    }
                ] 
            }
        ]
    },
    {
        uuid: '8',
        "mak": '3996.AEC.002',
        uraian: 'Kerjasama dan kemitraan antar instansi dan lembaga transportasi Laut',
        jenis: "header",
        kode_up: "",
        subMak: [
            {
                uuid: '9',
                "mak": '3996.AEC.002.051',
                uraian: 'Kerjasama antar instansi pemerintah/swasta/lembaga/terkait',
                jenis: "header",
                kode_up: "3996.AEC.002",
                subMak:[]
            },
        ]
    },
    {
        uuid: '10',
        "mak": '3996.AEC.002.051',
        uraian: 'Kerjasama antar instansi pemerintah/swasta/lembaga/terkait',
        jenis: "header",
        kode_up: "",
        subMak: []
    },
]

export default dataFake