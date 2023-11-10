import Button from '@components/Button/Button'
import CardEditOrderBarang from '@components/Card/CardEditOrderBarang'
import Header from '@components/Header'
import Input from '@components/Input/Input'
import SafeAreaScroll from '@components/SafeAreaScroll'
import useSearch from '@hooks/search'
import useBarang from '@hooks/useBarang'
import useDetailOrder from '@hooks/useDetailOrder'
import { DetailOrderBarangAttributes } from '@pages/prosesOrder'
import { useEffect, useMemo, useState } from 'react'
import { FlatList } from 'react-native'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


function getItemBySearch(data: DetailOrderBarangAttributes[], seacrh: string): DetailOrderBarangAttributes[] {
    return data.filter((item) => {
        return item.barang.data.attributes.nama.includes(seacrh) || item.barang.data.id.toString().includes(seacrh)
    })
}

function OrderBarang({ route, navigation }: any) {

    const { listDetailOrders, outlet } = route.params;
    const [dataListDetailOrder, setDataListDetailOrder] = useState<DetailOrderBarangAttributes[]>(listDetailOrders ?? []);
    const { search, handleSearch } = useSearch();
    const { listbarang, getDataBarang, isLoading } = useBarang();

    function onChangeByIndex(index: number, data: DetailOrderBarangAttributes) {
        let temp = dataListDetailOrder;
        temp[index] = data;
        setDataListDetailOrder([...temp]);
    }

    useEffect(() => {
        mergeData();
    }, [listDetailOrders])


    function mergeData() {
        if (!listDetailOrders.length) return setDataListDetailOrder(listbarang)
        let temp: DetailOrderBarangAttributes[] = []
        listbarang.map((barang) => {
            listDetailOrders.map((order: DetailOrderBarangAttributes) => {
                if (barang.barang.data.id === order.barang.data.id) {
                    temp.push(order)
                }
            })
        })
        setDataListDetailOrder(temp)
    }

    const RESULT_SEARCH = useMemo(() => getItemBySearch(dataListDetailOrder, search), [search, dataListDetailOrder])


    return (
        <SafeAreaView className='flex-1 w-full'>
            <Header title='Proses Order' isButtonBack />
            <View style={{ gap: 8 }} className='p-4 flex flex-row'>
                <Input classNameContainer='w-3/4' icon={require('../../assets/icons/iconSearchBlue.png')} name='search' placeholder='Cari ID/Nama' value={search} onChangeText={handleSearch} />
            </View>
            <FlatList
                style={{ paddingHorizontal: 16 }}
                data={RESULT_SEARCH}
                refreshing={isLoading}
                onRefresh={getDataBarang}
                keyExtractor={() => Math.random().toString()}
                renderItem={({ item, index }) => <CardEditOrderBarang onUpdateByIndex={onChangeByIndex} indexOfArray={index} detailOrder={item} />}
                ListFooterComponent={() => <SafeAreaScroll />}
            />
            <View className='absolute bottom-0 w-full p-4'>
                <Button onPress={() => navigation.push('ProsesOrder', { listDetailOrders: dataListDetailOrder, outlet },)}>Checkout</Button>
            </View>
        </SafeAreaView>
    )
}

export default OrderBarang