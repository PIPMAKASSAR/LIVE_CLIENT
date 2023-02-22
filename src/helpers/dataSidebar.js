import routeName from "./routeName"

export const dataSidebar = [
    {
        name: "Dashboard",
        link: routeName.dashboard,
    },
    {
        name: "Keuangan",
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