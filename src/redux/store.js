import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./feature/login"
import dashboardReducer from "./feature/dashboardSlice";
import penerimaanReducer from "./feature/penerimaSlice"
import pengeluaranReducer from "./feature/pengeluaranSlice"
import saldoOperasionalReducer from "./feature/saldoOperasionalSlice"
import saldoDanaKelolaanReducer from "./feature/saldoDanaKelolaanSlice"
import saldoPengelolaanKasReducer from "./feature/saldoPengelolaanKasSlice"
import errorHandlingReducer from "./feature/errorHandlingSlice"

export default configureStore({
    reducer: {
        login:loginReducer,
        dashboard:dashboardReducer,
        penerimaan: penerimaanReducer,
        pengeluaran: pengeluaranReducer,
        saldoOperasional: saldoOperasionalReducer,
        saldoDanaKelolaan: saldoDanaKelolaanReducer,
        saldoPengelolaanKas: saldoPengelolaanKasReducer,
        errorHandling: errorHandlingReducer,
    }
})