import axios from "axios";
import { BASE_URL } from "../constant/url";

export function addOutlet(token: string, data: any) {
    // TODO POST ORDER DULU
    const url = BASE_URL('/outlets');
    // console.log(data);


    const configHeaders = { Authorization: `Bearer ${token}` }

    axios.post(url,
        { data: data },
        {
            headers: configHeaders
        })
        .then(() => {
            alert('Berhasil Tambah Outlet')
        })
        .catch((error) => {
            alert('Gagal Tambah Outlet')
            // console.log(error);
        })

    // TODO GET ID FORM POST ORDER


    // TODO LOOPING POST DETAIL ORDER
}
