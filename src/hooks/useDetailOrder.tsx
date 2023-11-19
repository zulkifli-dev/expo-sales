import { DetailOrderBarangAttributes } from '@pages/prosesOrder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react'

function useDetailOrder() {
    const navigation: any = useNavigation();
    const [listDetailOrders, setListDetailOrders] = useState<DetailOrderBarangAttributes[]>([])
    const [listDetailOrdersLocal, setListDetailOrdersLocal] = useState<DetailOrderBarangAttributes[]>([])
    const [isLoading, setIsloading] = useState(false);

    const isFocused = useIsFocused();

    function onUpdateByIndex(data: DetailOrderBarangAttributes, indexOfArray: number) {
        let temp = listDetailOrders;
        temp[indexOfArray] = data;
        setListDetailOrders(temp);
    }

    function onAdd(data: DetailOrderBarangAttributes) {
        setListDetailOrders([...listDetailOrders, data])
    }

    function onRemoveByIndex(indexOfArray: number) {
        let temp = listDetailOrders.filter((detail, index) => indexOfArray !== index)
        setListDetailOrders(temp)
    }

    async function onSave() {
        setIsloading(true)
        const filterCekIsEmpty = listDetailOrders.filter((item) => item.jumlah_pack !== 0 || item.jumlah_pcs !== 0)
        await AsyncStorage.setItem('detailBarang', JSON.stringify(filterCekIsEmpty))
        setIsloading(false)
        navigation.navigate('ProsesOrder')
    }

    async function onRefresh() {
        setIsloading(true)
        const data = await AsyncStorage.getItem('detailBarang');
        if (data !== null) {
            const json = JSON.parse(data);
            // setListDetailOrders(json)
            setListDetailOrdersLocal(json)
        }
        setIsloading(false)
    }

    async function onReset() {
        setIsloading(true)
        await AsyncStorage.removeItem('detailBarang')
        setIsloading(false)
    }


    const onFilterDuplicated = useCallback((listBarang: DetailOrderBarangAttributes[]) => {

        if (listDetailOrdersLocal.length === 0) {
            return setListDetailOrders(listBarang);
        }

        // if (listBarang.length === listDetailOrders.length) return


        let filter: DetailOrderBarangAttributes[] = [];

        listBarang.map((barang, indexBarang) => {
            listDetailOrdersLocal.map((item,) => {
                if (barang.barang.data.id !== item.barang.data?.id) {
                    filter.push(barang)
                }
            });
        });
        // console.log(filter, '----------2--------');
        setListDetailOrders([...filter]);
    }, [isFocused]);




    return { listDetailOrders, listDetailOrdersLocal, isLoading, onUpdateByIndex, onAdd, onRemoveByIndex, onSave, onRefresh, onReset, onFilterDuplicated }
}

export default useDetailOrder