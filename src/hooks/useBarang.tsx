import { BASE_URL } from "../constant/url";
import { AuthContext } from "@context/authContext";
import { DetailOrderBarangAttributes } from "@pages/prosesOrder"
import { BarangType } from "@type/barang"
import axios from "axios";
import { useContext, useEffect, useState } from "react"


function generateToFormatDetailOrder(barangs: BarangType[]): DetailOrderBarangAttributes[] {
    return barangs.map((item, index) => {
        return {
            id: index,
            gross: 0,
            jumlah_pack: 0,
            jumlah_pcs: 0,
            "barang": {
                "data": item
            }
        }
    });
}

const SEMENTARA = [
    {
        "id": 1,
        "attributes": {
            "nama": "Barang A",
            "saldo_pack": 10000,
            "saldo_pcs": 0,
            "pcs_per_pack": 12,
            "harga_pcs": 1000,
            "harga_pack": 12000,
            "createdAt": "2023-11-08T17:20:41.152Z",
            "updatedAt": "2023-11-08T17:20:41.806Z",
            "publishedAt": "2023-11-08T17:20:41.805Z"
        }
    },
    {
        "id": 2,
        "attributes": {
            "nama": "Barang B",
            "saldo_pack": 20,
            "saldo_pcs": 0,
            "pcs_per_pack": 10,
            "harga_pcs": 10000,
            "harga_pack": 100000,
            "createdAt": "2023-11-09T11:22:26.717Z",
            "updatedAt": "2023-11-09T11:22:27.942Z",
            "publishedAt": "2023-11-09T11:22:27.940Z"
        }
    },
    {
        "id": 3,
        "attributes": {
            "nama": "Barang C",
            "saldo_pack": 20,
            "saldo_pcs": 0,
            "pcs_per_pack": 10,
            "harga_pcs": 10000,
            "harga_pack": 100000,
            "createdAt": "2023-11-09T11:22:41.002Z",
            "updatedAt": "2023-11-09T11:22:41.630Z",
            "publishedAt": "2023-11-09T11:22:41.629Z"
        }
    },
    {
        "id": 4,
        "attributes": {
            "nama": "Barang D",
            "saldo_pack": 20,
            "saldo_pcs": 0,
            "pcs_per_pack": 10,
            "harga_pcs": 10000,
            "harga_pack": 100000,
            "createdAt": "2023-11-09T11:22:47.967Z",
            "updatedAt": "2023-11-09T11:22:48.632Z",
            "publishedAt": "2023-11-09T11:22:48.630Z"
        }
    }
]

function useBarang() {
    const { user } = useContext(AuthContext)
    const [listbarang, setIslitBarang] = useState<DetailOrderBarangAttributes[]>(generateToFormatDetailOrder([]))
    const [isLoading, setIsLoading] = useState(false)

    async function getDataBarang() {
        setIsLoading(true)
        const url = BASE_URL('/barangs');
        if (!user?.jwt) return
        const token = user.jwt
        const configHeaders = { Authorization: `Bearer ${token}` }
        await axios.get(url, {
            headers: configHeaders
        }).then((response) => {
            const { data } = response.data
            setIslitBarang(generateToFormatDetailOrder(data))
        }).catch(() => {
            console.log('gagal');

        })
        setIsLoading(false)
    }

    useEffect(() => {
        getDataBarang()
    }, [user])


    return {
        listbarang,
        getDataBarang,
        isLoading
    }
}

export default useBarang