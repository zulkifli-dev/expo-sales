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
                        await axios.put(url, {
                            data: {
                                saldo_pack: item.barang.data.attributes.saldo_pack - item.jumlah_pack,
                                saldo_pcs: item.barang.data.attributes.saldo_pcs - item.jumlah_pcs,
                            }
                        }, {
                            headers: configHeaders
                        }).then((response) => {
                            // console.log(item.barang.data.id, response.data.data);
                        }).catch((error) => {
                            // console.log('gagal update', error)
                        })


                        axios.put(BASE_URL('/outlets/' + orderData.outlet), { data: { status: 'Selesai' } }, {
                            headers: configHeaders
                        }).then((response) => {
                            alert('Berhasil Konfirmasi Order')
                        })
                            .catch((error) => {
                                console.log('gagal update', error)
                            })

                    }).catch((error) => {
                        alert(JSON.stringify(error))
                    })
            })

        })
        .catch((error) => {
            // console.log(error);
        })

    // TODO GET ID FORM POST ORDER


    // TODO LOOPING POST DETAIL ORDER
}
