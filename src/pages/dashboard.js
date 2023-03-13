import { useState } from "react"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import {FaMoneyBillWave} from "react-icons/fa"
import {MdTrendingDown, MdTrendingUp} from "react-icons/md"
import {GiPayMoney, GiReceiveMoney, GiMoneyStack} from "react-icons/gi"
import {BiMoney} from "react-icons/bi"
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data } from "../helpers/data"
import { useDispatch, useSelector } from "react-redux"
import dateFormat from "dateformat";
import dashboardApi from "../api/dashboardApi"
import AngkaDashboard from "../helpers/angkaDashboard"
import "./dashboard.css"
import AngkaDashboard2 from "../helpers/angkaDashboard2"
import IconPresentase from "../component/iconPresentase"
import { totalPengeluaran } from "../redux/feature/dashboardSlice"
import CardDashboard from "../component/cardDashboard"
import AngkaDashboardRow2 from "../helpers/angkaDashboarRow2"
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import { subDays ,addDays, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import Button from "../component/button"
import LoadingSpinner from "../component/loadingSpinner"


const colors = ["#00cec9", "#0984e3", "#6c5ce7", "#ffeaa7", "#fab1a0", "#ff7675", "#fd79a8", "#fdcb6e", "#00b894", "#e17055", "#d63031", "#636e72"]

export default function Dashboard({isSideOpen}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [dateRange, setDateRange] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: new Date(),
    //       key: 'selection'
    //     }
    //   ]);
    const customRanges = [
        {
          label: 'Hari ini',
          range: () => ({
            startDate: new Date(),
            endDate: new Date()
          }),
          isSelected() {
            return true;
          },
        //   key: 'today'
        },
        {
          label: 'Kemarin',
          range: () => ({
            startDate: subDays(new Date(), 1),
            endDate: subDays(new Date(), 1),
          }),
          isSelected() {
            return true;
          },
        //   key: 'yesterday'
        },
        {
          label: 'Bulan ini',
          range: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
          }),
          isSelected() {
            return true;
          },
        //   key: 'thisMonth'
        },
        {
          label: 'Bulan kemarin',
          range: () => ({
            startDate: startOfMonth(subMonths(new Date(), 1)),
            endDate: endOfMonth(subMonths(new Date(), 1)),
          }),
          isSelected() {
            return true;
          },
        //   key: 'lastMonth'
        }
      ];
    const [dateRange, setDateRange] = useState([startOfMonth(new Date()), endOfMonth(new Date())]);
    const [startDate, endDate] = dateRange;

    const [reload, setReload] = useState(true)
    const [periode, setPeriode] = useState(false)
    const [loadingPenerima, setLoadingPenerima] = useState(false)
    const [loadingPengeluaran, setLoadingPengeluaran] = useState(false)
    const [loadingSaldoOperasional, setLoadingSaldoOperasional] = useState(false)
    const [loadingSaldoDanaKelolaan, setLoadingSaldoDanaKelolaan] = useState(false)
    const [loadingSaldoKas, setLoadingSaldoKas] = useState(false)
    const totalPenerimaan = useSelector(state => state.dashboard.totalPenerimaan)
    const totalPengeluaran = useSelector(state => state.dashboard.totalPengeluaran)
    const totalSaldoOperasional = useSelector(state => state.dashboard.totalSaldoOperasional)
    const totalSaldoDanaKelolaan = useSelector(state => state.dashboard.totalSaldoDanaKelolaan)
    const totalSaldoKas = useSelector(state => state.dashboard.totalSaldoKas)
    const grafikPenerimaan = useSelector(state => state.dashboard.grafikPenerimaan)
    const valuePenerima = useRef(null)
    valuePenerima.current = totalPenerimaan.item
    const valuePengeluaran = useRef(null)
    const valueSaldoOperasional = useRef(null)
    const valueSaldDanaKelolaan = useRef(null)
    const valueSaldoKas = useRef(null)
    const valueGrafikPenerimaan = useRef(null)
    const handleTanggal = (update) => {
        setReload(!reload)
        setDateRange(update)
        // dispatch(dashboardApi.getTotalPenerimaan(dateRange))
    }

    const handleGetData = async () => {
        setLoadingPenerima(true)
        setLoadingPengeluaran(true)
        setLoadingSaldoOperasional(true)
        setLoadingSaldoDanaKelolaan(true)
        setLoadingSaldoKas(true)
        dispatch(dashboardApi.getTotalPenerimaan(dateRange))
        .then(() => {
            setLoadingPenerima(false)
        })
        dispatch(dashboardApi.getTotalPengeluaran(dateRange))
        .then(() => {
            setLoadingPengeluaran(false)
        })
        dispatch(dashboardApi.getTotalSaldoOperasional(dateRange))
        .then(() => {
            setLoadingSaldoOperasional(false)
        })
        dispatch(dashboardApi.getTotalSaldoDanaKelolaan(dateRange))
        .then(() => {
            setLoadingSaldoDanaKelolaan(false)
        })
        dispatch(dashboardApi.getTotalSaldoKas(dateRange))
        .then(() => {
            setLoadingSaldoKas(false)
        })
        dispatch(dashboardApi.getGrafikPenerimaan(dateRange))
    }

    const handlePeriode = () => {
        setPeriode(!periode)
    }
  
    useEffect(() => {
        // dispatch(dashboardApi.getTotalPenerimaan(dateRange))
        // dispatch(dashboardApi.getTotalPengeluaran(dateRange))
        // dispatch(dashboardApi.getTotalSaldoOperasional(dateRange))
        // dispatch(dashboardApi.getTotalSaldoDanaKelolaan(dateRange))
        // dispatch(dashboardApi.getTotalSaldoKas(dateRange))
        // dispatch(dashboardApi.getGrafikPenerimaan(dateRange))
        handleGetData()
    },[reload])

    
   
    return(
        <div className={`p-4 w-full `}>
            <div className="p-4 w-full rounded-lg dark:border-gray-700 mt-20 2xl:mt-16 ">
                <div className="mb-4">
                    <div className="">
                        <label className="md:mr-2 w-full mb-2 text-sm font-medium text-gray-900 dark:text-white">Periode :</label>
                        <div className={`w-48`}>
                            <DatePicker
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={handleTanggal}
                                className="w-full 
                                p-4 
                                text-sm 
                                text-gray-900 
                                border 
                                border-gray-300 
                                rounded-lg 
                                bg-gray-50"
                                withPortal
                            />
                            {/* <DateRangePicker
                                // onChange={item => setDateRange(item.selection)}
                                onChange={handleTanggal}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={true}
                                months={2}
                                direction="horizontal"
                                ranges={dateRange}
                                staticRanges={customRanges}
                                dateDisplayFormat={'dd/MM/yyyy'}
                            /> */}
                        </div>
                    </div> 
                </div>
               
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4`}>
                    {/* card pemasukan */}
                    {/* <CardDashboard title={"Total Penerimaan"} Icon={AngkaDashboard} color={"green"} iconSize={"h-96"} data={valuePenerima.current} sizeFontJudul={"text-3xl"} sizeFontDetail={"text-sm"} /> */}
                    {
                        loadingPenerima ?
                        <div>
                            <LoadingSpinner />
                        </div>
                        :
                        <div className="flex flex-col rounded bg-gray-50 h-auto w-full p-9 dark:bg-gray-800">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold dark:text-white">
                                Total Penerimaan
                            </h3>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="text-green-400">
                                    <AngkaDashboard nilai={totalPenerimaan['penerimaan_bulan_ini']} />
                                </div>
                                <div className="font-bold text-xs md:text-md lg:text-lg">
                                    <span>Bulan lalu</span>
                                    <AngkaDashboard2 nilai={totalPenerimaan["penerimaan_bulan_lalu"]} keterangan={totalPenerimaan["keterangan"]} />
                                </div>
                                <GiReceiveMoney 
                                                className=" 
                                                object-cover 
                                                text-green-400
                                                text-7xl
                                                sm:text-8xl
                                                md:text-9xl
                                                "
                                />
                            </div>
                            <div className="flex items-center text-xs sm:text-sm md:text-lg ">
                                <IconPresentase keterangan={totalPenerimaan["keterangan"]} />
                                <span>{totalPenerimaan["persentase"]} {totalPenerimaan["keterangan"]}</span>
                            </div>
                        </div>
                    }

                    {/* card pengeluaran */}
                    {
                        loadingPengeluaran ?
                        <div>
                            <LoadingSpinner />
                        </div>
                        :
                        <div className="flex flex-col rounded bg-gray-50 h-auto w-full p-9 dark:bg-gray-800">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold dark:text-white">
                                Total Pengeluaran
                            </h3>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="text-red-400">
                                    <AngkaDashboard nilai={totalPengeluaran['pengeluaran_bulan_ini']} />
                                </div>
                                <div className="font-bold text-xs md:text-md lg:text-lg">
                                    <span>Bulan lalu</span>
                                    <AngkaDashboard2 nilai={totalPengeluaran["pengeluaran_bulan_lalu"]} keterangan={totalPengeluaran["keterangan"]} />
                                </div>
                                <GiPayMoney 
                                                className=" 
                                                object-cover 
                                                text-red-400
                                                text-7xl
                                                sm:text-8xl
                                                md:text-9xl
                                                "
                                />
                            </div>
                            <div className="flex items-center text-xs sm:text-sm md:text-lg ">
                                <IconPresentase keterangan={totalPengeluaran["keterangan"]} />
                                <span>{totalPengeluaran["persentase"]} {totalPengeluaran["keterangan"]}</span>
                            </div>
                        </div>
                    }
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
                    {
                        loadingSaldoOperasional ?
                        <div>
                            <LoadingSpinner />
                        </div>
                        :
                        <div className="flex flex-col justify-center p-9 h-auto w-auto rounded bg-gray-50 dark:bg-gray-800">
                                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-lg font-bold dark:text-white">
                                    Saldo Operasional
                                </h3>
                                <div className={`flex items-center justify-between gap-2`}>
                                    <div className="flex flex-col justify-center items-center text-yellow-400 ">
                                        <AngkaDashboardRow2 sizeFont={"text-4xl"} nilai={totalSaldoOperasional['saldooperasional_bulan_ini']} />
                                    </div>
                                    <div className="font-bold text-xs md:text-md ">
                                        <span>Bulan lalu</span>
                                        <AngkaDashboard2 nilai={totalSaldoOperasional["saldooperasional_bulan_lalu"]} keterangan={totalSaldoOperasional["keterangan"]} />
                                    </div>
                                    <FaMoneyBillWave  
                                        className=" 
                                            object-cover 
                                            text-yellow-400
                                            text-7xl
                                            sm:text-8xl
                                            md:text-9xl
                                        "
                                    />
                                </div>
                                <div className="flex items-center">
                                    <IconPresentase keterangan={totalSaldoOperasional["keterangan"]} />
                                    <span>{totalSaldoOperasional["persentase"]} {totalSaldoOperasional["keterangan"]}</span>
                                </div>
                        </div>
                    }
                    {
                        loadingSaldoDanaKelolaan ?
                        <div>
                            <LoadingSpinner />
                        </div>
                        :
                        <div className="flex flex-col justify-center p-9 h-auto w-auto rounded bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-lg font-bold dark:text-white">
                                Dana Kelolaan
                            </h3>
                            <div className="flex items-center gap-3 justify-between">
                                <div className="flex flex-col justify-center items-center text-blue-400 ">
                                    <AngkaDashboardRow2 sizeFont={"text-4xl"} nilai={totalSaldoDanaKelolaan['saldodanakelolaan_bulan_ini']} />
                                </div>
                                <div className="font-bold text-xs md:text-md">
                                    <span>Bulan lalu</span> 
                                    <AngkaDashboard2 nilai={totalSaldoDanaKelolaan["saldodanakelolaan_bulan_lalu"]} keterangan={totalSaldoDanaKelolaan["keterangan"]} />
                                </div>
                                <BiMoney  
                                    className=" 
                                        object-cover 
                                        text-blue-400
                                        text-7xl
                                        sm:text-8xl
                                        md:text-9xl
                                        "
                                />
                            </div>
                            <div className="flex items-center">
                                <IconPresentase keterangan={totalSaldoDanaKelolaan["keterangan"]} />
                                <span>{totalSaldoDanaKelolaan["persentase"]} {totalSaldoDanaKelolaan["keterangan"]}</span>
                            </div>
                        </div>
                    }
                    {
                        loadingSaldoKas ?
                        <div>
                            <LoadingSpinner />
                        </div>
                        :
                        <div className="flex flex-col justify-center h-auto w-auto p-9 rounded bg-gray-50 dark:bg-gray-800">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-lg font-bold dark:text-white">
                                Pengelolaan Kas
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col justify-center items-center text-blue-400 ">
                                    <AngkaDashboardRow2 sizeFont={"text-4xl"} nilai={totalSaldoKas['saldokas_bulan_ini']} />
                                </div>
                                <div className="font-bold text-xs md:text-md ">
                                    <span>Bulan lalu</span> 
                                    <AngkaDashboard2 nilai={totalSaldoKas["saldokas_bulan_lalu"]} keterangan={totalSaldoKas["keterangan"]} />
                                </div>
                                <GiMoneyStack 
                                    className=" 
                                        object-cover 
                                        text-violet-400  
                                        text-7xl
                                        sm:text-8xl
                                        md:text-9xl
                                        "
                                />
                            </div>
                            <div className="flex items-center">
                                <IconPresentase keterangan={totalSaldoKas["keterangan"]} />
                                <span>{totalSaldoKas["persentase"]} {totalSaldoKas["keterangan"]}</span>
                            </div>
                        </div>
                    }
                </div>

                <div className=" p-9 flex flex-col w-full h-chart rounded bg-gray-50">
                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-lg font-bold mb-5">GRAFIK PEMBUATAN PENERIMAAN MONTH TO MONTH</h1>
                    <ResponsiveContainer width="100%" height="100%">
                    <BarChart width={730} height={250} data={grafikPenerimaan.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="bulan" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" barSize={30} >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))
                        }
                            
                        </Bar>
                    </BarChart>
                        
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}