// import logo from './LOGO-PIP.png';
import './App.css';
import Login from "./pages/login"
import Layout from './pages/layout';
import Dashboard from './pages/dashboard';
import { createBrowserRouter ,Route,RouterProvider, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Penerimaan from './keuangan/pages/penerimaan';
import Pengeluaran from './keuangan/pages/pengeluaran';
import SaldoOperasional from './keuangan/pages/saldoOperasional';
import SaldoDanaKelolaan from './keuangan/pages/saldoDanaKelolaan';
import TambahPenerimaan from './keuangan/pages/tambahPenerimaan';
import TambahPengeluaran from './keuangan/pages/tambahPengeluaran';
import TambahSaldoOperasional from './keuangan/pages/tambahSaldoOperasional';
import TambahSaldoDanaKelolaan from './keuangan/pages/tambahSaldoDanaKelolaan';
import TambahSaldoPengelolaanKas from './keuangan/pages/tambahSaldoPengelolaanKas';
import SaldoPengelolaanKas from './keuangan/pages/saldoPengelolaanKas';
import NotFound from './pages/notFound';
import routeName from './helpers/routeName';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route index path={routeName.dashboard} element={<Dashboard />} />
          <Route path={routeName.penerima} element={<Penerimaan />} />
          <Route path={routeName.pengeluaran} element={<Pengeluaran />} />
          <Route path={routeName.saldoOperasional} element={ <SaldoOperasional /> } />
          <Route path={routeName.saldoDanaKelolaan} element={ <SaldoDanaKelolaan/> } />
          <Route path={routeName.saldoPengelolaanKas} element={ <SaldoPengelolaanKas /> } />
          <Route path={routeName.tambahPenerima} element={<TambahPenerimaan />} />
          <Route path={routeName.tambahPengeluaran} element={<TambahPengeluaran />} />
          <Route path={routeName.tambahSaldoOperasional} element={ <TambahSaldoOperasional /> } />
          <Route path={routeName.tambahSaldoDanaKelolaan} element={ <TambahSaldoDanaKelolaan /> } />
          <Route path={routeName.tambahSaldoPeneglolaanKas} element={ <TambahSaldoPengelolaanKas /> } />
        </Route>
        <Route path="*" element={ <NotFound /> } />
        <Route path={routeName.login} element={<Login/>} />
      </Routes>
    </BrowserRouter>
   
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  )
}

export default App;
