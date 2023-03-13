import routeName from "./routeName"

export const dataSidebar = [
    {
        name: "Dashboard",
        link: routeName.dashboard,
    },
    {   
        name: "Master",
        subMenu: [
            {
                name: "Penerima/Pihak Ketiga",
                link: routeName.listPenerimaPihakTiga,
            },
            {
                name: "Mak",
                link: routeName.mak,
            },
            // {
            //     name: "Pendapatan/tarif",
            //     link: routeName.pendapatan,
            // }
        ]
    },
    {
        name: "Keuangan",
        subMenu: [
            {
                name: "Rincian Satker",
                link: routeName.satker
            },
            {
                name: "Belanja",
                link: routeName.belanja
            }
        ]
    },
    {
        name: "Integrasi Bios",
        subMenu:[
            {
                name:"Penerimaan",
                link: routeName.penerima,

            },
            {
                name:"Pengeluaran",
                link: routeName.pengeluaran,
            },
            {
                name:"Saldo Operasional",
                link: routeName.saldoOperasional,
            },
            {
                name:"Saldo Dana Kelolaan",
                link: routeName.saldoDanaKelolaan,
            },
            {
                name:"Saldo Pengelolaan Kas",
                link: routeName.saldoPengelolaanKas,
            }
        ] 
        
    },
]