const fakeData = [
   {
    "tanggal" : "1 Februari 2023", 
    "kodeAkun": "46551", 
    "nilai": "Rp. 450.000", 
    "update":"Posting",
   },
   {
    "tanggal" : "1 Februari 2023", 
    "kodeAkun": "46551", 
    "nilai": "Rp. 450.000", 
    "update":"Pending",
   }
]

const fakeDataPihakKetiga = [
   {
      id: "1",
      "nama" : "PT. KARYA LINTAS MANDIRI", 
      "Rekening": "123456789", 
      "npwp": "01.010.101.0001.0001", 
     },
]

const fakeDataBelanja = [
   {
      "uuid": "1",
      'mak' : "SAB.004.601.F.525114", 
      'penerima' : "PT. KARYA LINTAS MANDIRI", 
      'uraian' : "Belanja modal penunjang diklat pada kapal latin yaitu ECDIS pada PIP", 
      'nilai' : "364190000", 
      'pajak': "ppn: 36000 pph: 4000"
     },
]

const fakeAkun = [
   {
       "kode": "424111",
       "uraian": "Pendapatan Jasa Pelayanan  Rumah Sakit                                                                                                                "
   },
   {
       "kode": "424112",
       "uraian": "Pendapatan Jasa Pelayanan Pendidikan                                                                                                                  "
   },
   {
       "kode": "424113",
       "uraian": "Pendapatan Jasa Pelayanan Tenaga, Pekerjaan, Informasi, Pelatihan dan Teknologi                                                                       "
   },
   {
       "kode": "424114",
       "uraian": "Pendapatan Jasa Pencetakan                                                                                                                            "
   },
   {
       "kode": "424115",
       "uraian": "Pendapatan Jasa Bandar Udara, Kepelabuhan dan Kenavigasian                                                                                            "
   },
   {
       "kode": "424116",
       "uraian": "Pendapatan Jasa Penyelenggaraan Telekomunikasi                                                                                                        "
   },
   {
       "kode": "424117",
       "uraian": "Pendapatan Jasa Pelayanan Pemasaran                                                                                                                   "
   },
   {
       "kode": "424118",
       "uraian": "Pendapatan Penyediaan Barang                                                                                                                          "
   },
   {
       "kode": "424119",
       "uraian": "Pendapatan Jasa Penyediaan Barang dan Jasa Lainnya                                                                                                    "
   },
   {
       "kode": "424121",
       "uraian": "Pendapatan Pengelolaan Kawasan Otorita                                                                                                                "
   },
   {
       "kode": "424122",
       "uraian": "Pendapatan Pengelolaan Kawasan Pengembangan Ekonomi Terpadu                                                                                           "
   },
   {
       "kode": "424123",
       "uraian": "Pendapatan Pengelolaan Fasilitas Umum Milik Pemerintah                                                                                                "
   },
   {
       "kode": "424129",
       "uraian": "Pendapatan Pengelolaan Kawasan Lainnya                                                                                                                "
   },
   {
       "kode": "424131",
       "uraian": "Pendapatan Program Dana Penjaminan                                                                                                                    "
   },
   {
       "kode": "424132",
       "uraian": "Pendapatan Program Dana Penjaminan Syariah                                                                                                            "
   },
   {
       "kode": "424133",
       "uraian": "Pendapatan Program Modal Ventura                                                                                                                      "
   },
   {
       "kode": "424134",
       "uraian": "Pendapatan Program Dana Bergulir Sektoral                                                                                                             "
   },
   {
       "kode": "424135",
       "uraian": "Pendapatan Program Dana Bergulir Syariah                                                                                                              "
   },
   {
       "kode": "424136",
       "uraian": "Pendapatan Investasi                                                                                                                                  "
   },
   {
       "kode": "424137",
       "uraian": "Pendapatan Pengelolaan Dana Pengembangan Pendidikan Nasional                                                                                          "
   },
   {
       "kode": "424139",
       "uraian": "Pendapatan Pengelolaan Dana Khusus Lainnya                                                                                                            "
   },
   {
       "kode": "424311",
       "uraian": "Pendapatan Hasil Kerjasama Perorangan                                                                                                                 "
   },
   {
       "kode": "424312",
       "uraian": "Pendapatan Hasil Kerja Sama Lembaga/Badan Usaha                                                                                                       "
   },
   {
       "kode": "424313",
       "uraian": "Pendapatan Hasil Kerja Sama Pemerintah Daerah                                                                                                         "
   },
   {
       "kode": "424911",
       "uraian": "Pendapatan Jasa Layanan Perbankan BLU                                                                                                                 "
   },
   {
       "kode": "424912",
       "uraian": "Pendapatan Jasa Layanan Perbankan BLU yang dibatasi pengelolaannya                                                                                    "
   },
   {
       "kode": "525111",
       "uraian": "Belanja Gaji dan Tunjangan                                                                                                                            "
   },
   {
       "kode": "525112",
       "uraian": "Belanja Barang                                                                                                                                        "
   },
   {
       "kode": "525113",
       "uraian": "Belanja Jasa                                                                                                                                          "
   },
   {
       "kode": "525114",
       "uraian": "Belanja Pemeliharaan                                                                                                                                  "
   },
   {
       "kode": "525115",
       "uraian": "Belanja Perjalanan                                                                                                                                    "
   },
   {
       "kode": "525116",
       "uraian": "Belanja atas Pengelolaan Endowment Fund                                                                                                               "
   },
   {
       "kode": "525119",
       "uraian": "Belanja Penyediaan Barang dan Jasa BLU Lainnya                                                                                                        "
   },
   {
       "kode": "537111",
       "uraian": "Belanja Modal Tanah - BLU                                                                                                                             "
   },
   {
       "kode": "537112",
       "uraian": "Belanja Modal Peralatan dan Mesin - BLU                                                                                                               "
   },
   {
       "kode": "537113",
       "uraian": "Belanja Modal Gedung dan Bangunan - BLU                                                                                                               "
   },
   {
       "kode": "537114",
       "uraian": "Belanja Modal Jalan, Irigasi dan Jaringan - BLU                                                                                                       "
   },
   {
       "kode": "537115",
       "uraian": "Belanja Modal Lainnya - BLU                                                                                                                           "
   },
   {
       "kode": "424141",
       "uraian": "Pendapatan dari Pengelolaan BMN pada Pengelola Barang                                                                                                 "
   },
   {
       "kode": "525118",
       "uraian": "Belanja Ketersediaan Layanan BLU                                                                                                                      "
   },
   {
       "kode": "424138",
       "uraian": "Pendapatan Dana Perkebunan Kelapa Sawit                                                                                                               "
   },
   {
       "kode": "525117",
       "uraian": "Belanja Pengelolaan Dana Perkebunan Kelapa Sawit                                                                                                      "
   },
   {
       "kode": "424211",
       "uraian": "Pendapatan Hibah Terikat Dalam Negeri-Perorangan - Uang                                                                                               "
   },
   {
       "kode": "424212",
       "uraian": "Pendapatan Hibah Terikat Dalam Negeri-Lembaga/Badan Usaha - Uang                                                                                      "
   },
   {
       "kode": "424213",
       "uraian": "Pendapatan Hibah Terikat Dalam Negeri-Pemda - Uang                                                                                                    "
   },
   {
       "kode": "424214",
       "uraian": "Pendapatan Hibah Terikat Luar Negeri-Perorangan - Uang                                                                                                "
   },
   {
       "kode": "424215",
       "uraian": "Pendapatan Hibah Terikat Luar Negeri-Lembaga/Badan Usaha - Uang                                                                                       "
   },
   {
       "kode": "424216",
       "uraian": "Pendapatan Hibah Terikat Luar Negeri-Negara - Uang                                                                                                    "
   },
   {
       "kode": "424219",
       "uraian": "Pendapatan Hibah Terikat Lainnya - Uang                                                                                                               "
   },
   {
       "kode": "424221",
       "uraian": "Pendapatan Hibah Tidak Terikat Dalam Negeri-Perorangan - Uang                                                                                         "
   },
   {
       "kode": "424222",
       "uraian": "Pendapatan Hibah Tidak Terikat Dalam Negeri-Lembaga/Badan Usaha - Uang                                                                                "
   },
   {
       "kode": "424223",
       "uraian": "Pendapatan Hibah Tidak Terikat Dalam Negeri-Pemda - Uang                                                                                              "
   },
   {
       "kode": "424224",
       "uraian": "Pendapatan Hibah Tidak Terikat Luar Negeri-Perorangan - Uang                                                                                          "
   },
   {
       "kode": "424225",
       "uraian": "Pendapatan Hibah Tidak Terikat Luar Negeri-Lembaga/Badan Usaha - Uang                                                                                 "
   },
   {
       "kode": "424226",
       "uraian": "Pendapatan Hibah Tidak Terikat Luar Negeri-Negara - Uang                                                                                              "
   },
   {
       "kode": "424229",
       "uraian": "Pendapatan Hibah Tidak Terikat -Lainnya - Uang                                                                                                        "
   },
   {
       "kode": "424421",
       "uraian": "Pendapatan dari Pelayanan BLU yang bersumber dari Entitas Pemerintah Pusat dalam Satu Kementerian Negara/Lembaga                                      "
   },
   {
       "kode": "424422",
       "uraian": "Pendapatan dari Pelayanan BLU yang Bersumber dari Entitas Pemerintah Pusat di luar Kementerian Negara/Lembaga yang membawahi BLU                      "
   },
   {
       "kode": "424913",
       "uraian": "Komisi, Potongan, dan/atau Bentuk Lain Sebagai Akibat dari Pengadaan Barang/Jasa oleh BLU                                                             "
   },
   {
       "kode": "424914",
       "uraian": "Pendapatan Selisih Kurs Terealisasi - BLU                                                                                                             "
   },
   {
       "kode": "424915",
       "uraian": "Penerimaan Kembali Belanja Barang BLU Tahun Anggaran Yang Lalu                                                                                        "
   },
   {
       "kode": "525121",
       "uraian": "Belanja Barang Persediaan Barang Konsumsi - BLU                                                                                                       "
   },
   {
       "kode": "525122",
       "uraian": "Belanja Barang Persediaan Amunisi - BLU                                                                                                               "
   },
   {
       "kode": "525123",
       "uraian": "Belanja Barang Persediaan Pemeliharaan - BLU                                                                                                          "
   },
   {
       "kode": "525124",
       "uraian": "Belanja Barang Persediaan Pita Cukai, Materai dan Leges - BLU                                                                                         "
   },
   {
       "kode": "525125",
       "uraian": "Belanja Barang Persediaan untuk Dijual/Diserahkan kepada Masyarakat - BLU                                                                             "
   },
   {
       "kode": "525126",
       "uraian": "Belanja Barang Persediaan Bahan Baku untuk Proses Produksi - BLU                                                                                      "
   },
   {
       "kode": "525127",
       "uraian": "Belanja Barang Persediaan Barang dalam Proses untuk Proses Produksi - BLU                                                                             "
   },
   {
       "kode": "525129",
       "uraian": "Belanja Barang Persediaan Lainnya - BLU                                                                                                               "
   },
   {
       "kode": "424411",
       "uraian": "Pendapatan dari Alokasi APBN                                                                                                                          "
   },
   {
       "kode": "525131",
       "uraian": "Belanja Asuransi BMN Gedung dan Bangunan - BLU                                                                                                        "
   },
   {
       "kode": "525132",
       "uraian": "Belanja Asuransi BMN Alat Angkutan Darat/Apung/Udara Bermotor - BLU                                                                                   "
   },
   {
       "kode": "525133",
       "uraian": "Belanja Asuransi BMN Jembatan - BLU                                                                                                                   "
   },
   {
       "kode": "424916",
       "uraian": "Penerimaan Kembali Belanja Modal BLU Tahun Anggaran Yang Lalu                                                                                         "
   },
   {
       "kode": "424917",
       "uraian": "Pendapatan Penyelesaian Tuntutan Perbendaharaan / TGR - BLU                                                                                           "
   },
   {
       "kode": "424919",
       "uraian": "Pendapatan Lain-lain BLU                                                                                                                              "
   },
   {
       "kode": "424921",
       "uraian": "Pendapatan BLU Lainnya dari Sewa Tanah                                                                                                                "
   },
   {
       "kode": "424922",
       "uraian": "Pendapatan BLU Lainnya dari Sewa Gedung                                                                                                               "
   },
   {
       "kode": "424923",
       "uraian": "Pendapatan BLU Lainnya dari Sewa Ruangan                                                                                                              "
   },
   {
       "kode": "424924",
       "uraian": "Pendapatan BLU Lainnya dari Sewa Peralatan dan Mesin                                                                                                  "
   },
   {
       "kode": "424925",
       "uraian": "Pendapatan BLU Lainnya dari Sewa Aset Tetap Lainnya                                                                                                   "
   },
   {
       "kode": "424929",
       "uraian": "Pendapatan BLU Lainnya dari Sewa Lainnya                                                                                                              "
   },
   {
       "kode": "424931",
       "uraian": "Pendapatan BLU Lainnya dari Penjualan Tanah BLU                                                                                                       "
   },
   {
       "kode": "424932",
       "uraian": "Pendapatan BLU Lainnya dari Penjualan Gedung dan Bangunan BLU                                                                                         "
   },
   {
       "kode": "424933",
       "uraian": "Pendapatan BLU Lainnya dari Penjualan Peralatan dan Mesin BLU                                                                                         "
   },
   {
       "kode": "424934",
       "uraian": "Pendapatan BLU Lainnya dari Penjualan Aset Tetap Lainnya BLU                                                                                          "
   },
   {
       "kode": "424939",
       "uraian": "Pendapatan BLU Lainnya dari Penjualan BMN Lainnya BLU                                                                                                 "
   },
   {
       "kode": "424941",
       "uraian": "Pendapatan BLU Lainnya dari Tukar Menukar Tanah BLU                                                                                                   "
   },
   {
       "kode": "424942",
       "uraian": "Pendapatan BLU Lainnya dari Tukar Menukar Gedung dan Bangunan BLU                                                                                     "
   },
   {
       "kode": "424943",
       "uraian": "Pendapatan BLU Lainnya dari Tukar Menukar Peralatan dan Mesin BLU                                                                                     "
   },
   {
       "kode": "424944",
       "uraian": "Pendapatan BLU Lainnya dari Tukar Menukar Jalan, Irigasi dan Jaringan BLU                                                                             "
   },
   {
       "kode": "424945",
       "uraian": "Pendapatan BLU Lainnya dari Tukar Menukar Aset Tetap Lainnya BLU                                                                                      "
   },
   {
       "kode": "424949",
       "uraian": "Pendapatan BLU Lainnya dari Tukar Menukar BMN Lainnya BLU                                                                                             "
   },
   {
       "kode": "525141",
       "uraian": "Belanja Barang BLU kepada BLU Lain dalam Satu Kementerian Negara/Lembaga                                                                              "
   },
   {
       "kode": "525142",
       "uraian": "Belanja Barang BLU Kepada BLU Lain yang berada dalam Kementerian Negara/Lembaga Lain                                                                  "
   },
   {
       "kode": "525143",
       "uraian": "Belanja Jasa BLU kepada BLU Lain dalam Satu Kementerian Negara/Lembaga                                                                                "
   },
   {
       "kode": "525144",
       "uraian": "Belanja Jasa BLU Kepada BLU Lain yang berada dalam Kementerian Negara/Lembaga Lain                                                                    "
   },
   {
       "kode": "424951",
       "uraian": "Pendapatan dari Penerimaan Klaim Asuransi BMN BLU                                                                                                     "
   },
   {
       "kode": "525152",
       "uraian": "Belanja Barang BLU - Penanganan Pandemi COVID-19                                                                                                      "
   },
   {
       "kode": "525153",
       "uraian": "Belanja Barang Persediaan BLU - Penanganan Pandemi COVID-19                                                                                           "
   },
   {
       "kode": "525154",
       "uraian": "Belanja Jasa BLU - Penanganan Pandemi COVID-19                                                                                                        "
   },
   {
       "kode": "525155",
       "uraian": "Belanja Pemeliharaan BLU - Penanganan Pandemi COVID-19                                                                                                "
   },
   {
       "kode": "525156",
       "uraian": "Belanja Perjalanan BLU - Penanganan Pandemi COVID-19                                                                                                  "
   },
   {
       "kode": "537122",
       "uraian": "Belanja Modal Peralatan dan Mesin BLU - Penanganan Pandemi COVID-19                                                                                   "
   },
   {
       "kode": "537123",
       "uraian": "Belanja Modal Gedung dan Bangunan BLU - Penanganan Pandemi COVID-19                                                                                   "
   },
   {
       "kode": "537125",
       "uraian": "Belanja Modal Lainnya BLU - Penanganan Pandemi COVID-19                                                                                               "
   },
   {
       "kode": "525151",
       "uraian": "Belanja Pengelolaan Dana Program Lingkungan Hidup                                                                                                     "
   }
]

const fakeRekening = [
   {
       "kode": "01",
       "uraian": "Rekening pengelolaan kas BLU"
   },
   {
       "kode": "02",
       "uraian": "Rekening operasional BLU"
   },
   {
       "kode": "03",
       "uraian": "Rekening dana kelolaan"
   }
]

const fakeBank = [
   {
       "kode": "002",
       "uraian": "BANK BRI"
   },
   {
       "kode": "008",
       "uraian": "BANK MANDIRI"
   },
   {
       "kode": "009",
       "uraian": "BANK BNI"
   },
   {
       "kode": "011",
       "uraian": "BANK DANAMON"
   },
   {
       "kode": "013",
       "uraian": "BANK PERMATA"
   },
   {
       "kode": "014",
       "uraian": "BANK BCA"
   },
   {
       "kode": "016",
       "uraian": "BANK BII"
   },
   {
       "kode": "019",
       "uraian": "BANK PANIN"
   },
   {
       "kode": "022",
       "uraian": "BANK CIMB NIAGA"
   },
   {
       "kode": "026",
       "uraian": "BANK LIPPO"
   },
   {
       "kode": "028",
       "uraian": "BANK NISP"
   },
   {
       "kode": "031",
       "uraian": "BANK CITY"
   },
   {
       "kode": "032",
       "uraian": "BANK JP MORGAN"
   },
   {
       "kode": "037",
       "uraian": "BANK ARTHA GRAHA"
   },
   {
       "kode": "040",
       "uraian": "BANK BANGKOK"
   },
   {
       "kode": "041",
       "uraian": "BANK HSBC"
   },
   {
       "kode": "042",
       "uraian": "BANK OF TOKYO MITSUBISHI"
   },
   {
       "kode": "045",
       "uraian": "BANK SUMITOMO MITSUI IND"
   },
   {
       "kode": "046",
       "uraian": "BANK DBS"
   },
   {
       "kode": "048",
       "uraian": "BANK MIZUHO"
   },
   {
       "kode": "050",
       "uraian": "BANK STANDARD CHARTERED"
   },
   {
       "kode": "052",
       "uraian": "BANK ABN AMRO"
   },
   {
       "kode": "061",
       "uraian": "ANZ PANIN"
   },
   {
       "kode": "067",
       "uraian": "BANK DEUTSCHE"
   },
   {
       "kode": "089",
       "uraian": "BANK RABO"
   },
   {
       "kode": "110",
       "uraian": "BANK JABAR BANTEN"
   },
   {
       "kode": "111",
       "uraian": "BANK DKI"
   },
   {
       "kode": "112",
       "uraian": "BANK DI YOGYAKARTA"
   },
   {
       "kode": "113",
       "uraian": "BANK JATENG"
   },
   {
       "kode": "114",
       "uraian": "BANK JAWA TIMUR"
   },
   {
       "kode": "115",
       "uraian": "BANK JAMBI"
   },
   {
       "kode": "115",
       "uraian": "Bank Jambi"
   },
   {
       "kode": "116",
       "uraian": "BANK BPD ACEH"
   },
   {
       "kode": "116",
       "uraian": "BANK BPD ACEH"
   },
   {
       "kode": "117",
       "uraian": "BANK SUMUT"
   },
   {
       "kode": "118",
       "uraian": "BANK NAGARI"
   },
   {
       "kode": "119",
       "uraian": "BANK RIAU"
   },
   {
       "kode": "120",
       "uraian": "BANK SUMSEL BABEL"
   },
   {
       "kode": "120",
       "uraian": "BANK SUMSEL BABEL"
   },
   {
       "kode": "121",
       "uraian": "BANK LAMPUNG"
   },
   {
       "kode": "122",
       "uraian": "BANK KALSEL"
   },
   {
       "kode": "123",
       "uraian": "BANK KALBAR"
   },
   {
       "kode": "124",
       "uraian": "BANK KALTIM SYARIAH"
   },
   {
       "kode": "124",
       "uraian": "BANK KALTIM"
   },
   {
       "kode": "125",
       "uraian": "BANK KALTENG"
   },
   {
       "kode": "126",
       "uraian": "BANK SULSELBAR"
   },
   {
       "kode": "127",
       "uraian": "BANK SULUT"
   },
   {
       "kode": "128",
       "uraian": "BANK NTB SYARIAH"
   },
   {
       "kode": "128",
       "uraian": "BANK NTB"
   },
   {
       "kode": "129",
       "uraian": "BPD BALI"
   },
   {
       "kode": "130",
       "uraian": "BANK NTT"
   },
   {
       "kode": "131",
       "uraian": "BANK MALUKU"
   },
   {
       "kode": "132",
       "uraian": "BANK PAPUA"
   },
   {
       "kode": "133",
       "uraian": "BANK BENGKULU"
   },
   {
       "kode": "134",
       "uraian": "BANK SULTENG"
   },
   {
       "kode": "135",
       "uraian": "BANK SULTRA"
   },
   {
       "kode": "147",
       "uraian": "BANK MUAMALAT INDONESIA"
   },
   {
       "kode": "153",
       "uraian": "BANK SINAR MAS"
   },
   {
       "kode": "200",
       "uraian": "BANK TABUNGAN NEGARA"
   },
   {
       "kode": "200",
       "uraian": "BANK TABUNGAN NEGARA"
   },
   {
       "kode": "213",
       "uraian": "BTPN"
   },
   {
       "kode": "330",
       "uraian": "BANK OF AMERICA"
   },
   {
       "kode": "422",
       "uraian": "BRI Syariah"
   },
   {
       "kode": "426",
       "uraian": "BANK MEGA"
   },
   {
       "kode": "427",
       "uraian": "BANK BNI SYARIAH"
   },
   {
       "kode": "441",
       "uraian": "BANK BUKOPIN"
   },
   {
       "kode": "451",
       "uraian": "BANK SYARIAH INDONESIA"
   },
   {
       "kode": "484",
       "uraian": "BANK HANA"
   },
   {
       "kode": "494",
       "uraian": "BRI Agro"
   },
   {
       "kode": "506",
       "uraian": "BANK MEGA"
   },
   {
       "kode": "506",
       "uraian": "BANK MEGA SYARIAH"
   },
   {
       "kode": "517",
       "uraian": "PANIN DUBAI SYARIAH"
   },
   {
       "kode": "521",
       "uraian": "Bukopin Syariah"
   },
   {
       "kode": "547",
       "uraian": "BTPN Syariah"
   },
   {
       "kode": "553",
       "uraian": "Mayora"
   },
   {
       "kode": "555",
       "uraian": "BANK BRI Cab. Manna"
   },
   {
       "kode": "601",
       "uraian": "Pos"
   },
   {
       "kode": "773",
       "uraian": "BNI Syariah"
   },
   {
       "kode": "781",
       "uraian": "BJB Syariah"
   },
   {
       "kode": "949",
       "uraian": "BANK CHINA TRUST"
   },
   {
       "kode": "950",
       "uraian": "BANK COMMONWEALTH"
   },
   {
       "kode": "990",
       "uraian": "Bank LN"
   },
   {
       "kode": "201",
       "uraian": "BTN Syariah"
   }
]

const fakePendapatan = [
    {
        uuid: "1",
        belanja: "424112",
        uraian: "PENDAPATAN JASA PENDIDIKAN",
    },
] 
const fakePendapatanDetail = [
    {
        uuid: "1",
        belanja: "424112",
        uraian: "PENDAPATAN JASA PENDIDIKAN",
        subMak: [
            {
                uuid: "1",
                belanja:"424112.1",
                uraian: "Layanan seleksi Penerimaan Diklat Peningkatan",
                subMak: [
                    {
                        uuid: "1",
                        belanja:"424112.1.1",
                        uraian: "pendaftaran penerimaan diklat peningkatan",
                    }
                ]
            }
        ],
    },
]  


export default {
   fakeData,
   fakeDataPihakKetiga,
   fakeDataBelanja,
   fakeAkun,
   fakeBank,
   fakeRekening,
   fakePendapatan,
   fakePendapatanDetail,
}