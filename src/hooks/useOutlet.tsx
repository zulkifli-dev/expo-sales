import { AuthContext } from '@context/authContext'
import { BASE_URL } from '../constant/url'
import { OutletAttributes } from '@type/order'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import useModal from './modal'


interface getOutletType {
    id: string
    attributes: OutletAttributes
}

function useOutlet() {
    const { user } = useContext(AuthContext);
    const [outlets, setOutlets] = useState<getOutletType[]>([])
    const [selectOutlet, setSelectOutlet] = useState('Semua')

    useEffect(() => {
        function getOutlet() {
            const url = BASE_URL(`/outlets`)
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            }).then((response) => {
                const { data } = response.data
                setOutlets(data)
            }).catch((error) => {
                // console.log(error)
            })
        }
        getOutlet();
    }, []);


    function onSelectOutlet(value: string) {
        setSelectOutlet(value)
    }

    return {
        outlets,
        selectOutlet,
        onSelectOutlet
    }
}

export default useOutlet