import { DetailOrderBarangAttributes } from "@pages/prosesOrder"
import { BASE_URL } from "../constant/url"
import axios from "axios"

export type formatDetailOrderPost = {
    barang: number,
    jumlah_pcs: number,
    jumlah_pack: number,
    gross: number,
    order: number
}

type formatOrderPost = {
    periode: number,
    outlet: number,
    salesman: number,
    status: string,
    waktu_order: string,
    total_gross: number,
}
export function KonfirmasiOrder(token: string, orderData: formatOrderPost, orderDetail: DetailOrderBarangAttributes[]) {
    // TODO POST ORDER DULU
    const url = BASE_URL('/orders');
    const url_detail = BASE_URL('/detail-orders');

    const configHeaders = { Authorization: `Bearer ${token}` }

    axios.post(url,
        { data: orderData },
        {
            headers: configHeaders
        })
        .then((response) => {
            const { id } = response.data.data
            orderDetail.map(async (item) => {
                const detail: formatDetailOrderPost = {
                    barang: item.barang.data.id,
                    gross: (item.jumlah_pack * item.barang.data.attributes.harga_pack) + (item.jumlah_pcs * item.barang.data.attributes.harga_pcs),
                    jumlah_pack: item.jumlah_pack,
                    jumlah_pcs: item.jumlah_pcs,
                    order: id
                }
                await axios.post(url_detail,
                    {
                        data: detail
                    },
                    {
                        headers: configHeaders
                    }
                )
                    .then(async (response) => {

                        const url = BASE_URL(`/barangs/${item.barang.data.id}`)
                        console.log(url);

                        await axios.put(url, {
                            data: {
                                saldo_pack: item.barang.data.attributes.saldo_pack - item.jumlah_pack,
                                saldo_pcs: item.barang.data.attributes.saldo_pcs - item.jumlah_pcs,
                            }
                        }, {
                            headers: configHeaders
                        }).then((response) => {
                            console.log(item.barang.data.id, response.data.data);
                        }).catch((error) => {
                            console.log('gagal update', error)
                        })

                    }).catch((error) => {
                        alert(JSON.stringify(error))
                    })
            })

        })
        .catch((error) => {
            console.log(error);
        })

    // TODO GET ID FORM POST ORDER


    // TODO LOOPING POST DETAIL ORDER
}


// "data": [
//     {
//       "id": 1,
//       "attributes": {
//         "waktu_order": "2023-11-07T16:45:00.000Z",
//         "total_gross": 12000,
//         "createdAt": "2023-11-08T17:21:17.090Z",
//         "updatedAt": "2023-11-08T17:26:30.384Z",
//         "publishedAt": "2023-11-08T17:21:18.557Z",
//         "status": null,
//         "periode": {
//           "data": {
//             "id": 1,
//             "attributes": {
//               "nama": "November",
//               "tanggal_mulai": "2023-11-01",
//               "tanggal_akhir": "2023-12-09",
//               "status": "aktif",
//               "createdAt": "2023-11-07T07:26:45.522Z",
//               "updatedAt": "2023-11-07T07:26:46.303Z",
//               "publishedAt": "2023-11-07T07:26:46.300Z"
//             }
//           }
//         },
//         "outlet": {
//           "data": {
//             "id": 1,
//             "attributes": {
//               "nama": "OUTLET A",
//               "type": "TYPE A",
//               "alamat": "ALAMAT A",
//               "kecamatan": "KECAMATAN A",
//               "kelurahan": "KELURAHAN A",
//               "target": "1000000",
//               "createdAt": "2023-11-07T08:44:25.990Z",
//               "updatedAt": "2023-11-08T17:05:28.686Z",
//               "publishedAt": "2023-11-07T08:44:26.501Z",
//               "status": "cukup"
//             }
//           }
//         },
//         "salesman": {
//           "data": {
//             "id": 1,
//             "attributes": {
//               "createdAt": "2023-11-07T08:43:45.384Z",
//               "updatedAt": "2023-11-07T09:19:35.662Z",
//               "publishedAt": "2023-11-07T08:44:35.790Z",
//               "omset": 10000,
//               "target_outlet": 10,
//               "aktual_outlet": 1
//             }
//           }
//         },
//         "detail_orders": {
//           "data": [
//             {
//               "id": 1,
//               "attributes": {
//                 "jumlah_pcs": 12,
//                 "jumlah_pack": 0,
//                 "gross": 12000,
//                 "createdAt": "2023-11-08T17:21:43.462Z",
//                 "updatedAt": "2023-11-08T18:20:15.792Z",
//                 "publishedAt": "2023-11-08T17:21:44.163Z"
//               }
//             }
//           ]
//         }
//       }
//     }