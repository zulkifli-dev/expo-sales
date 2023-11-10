import Button from '@components/Button/Button'
import CardOrderBarang from '@components/Card/CardOrderBarang'
import Header from '@components/Header'
import Input from '@components/Input/Input'
import LabelValue from '@components/LabelValue'
import ModalBottom from '@components/Modal/ModalBottom'
import { AuthContext } from '@context/authContext'
import useModal from '@hooks/modal'
import useSearch from '@hooks/search'
import { CommonActions, useIsFocused, useNavigation } from '@react-navigation/native'

import { KonfirmasiOrder, formatDetailOrderPost } from '@service/order'
import formatRupiah from '@tools/formatRupiah'
import { DetailOrderAttributes, OrderAttributes, OutletAttributes } from '@type/order'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type OrderBarangAttributes = Omit<OrderAttributes, 'createdAt' | 'updatedAt' | 'publishedAt'>[];
export type DetailOrderBarangAttributes = Omit<DetailOrderAttributes, 'createdAt' | 'updatedAt' | 'publishedAt'>

function deleteIsEmpty(data: DetailOrderBarangAttributes[]) {
    return data.filter((item) => {
        return item.jumlah_pack !== 0 || item.jumlah_pcs !== 0
    })
}


function getTotalPerItem(data: DetailOrderBarangAttributes) {
    return data.jumlah_pack * data.barang.data.attributes.harga_pack + data.jumlah_pcs * data.barang.data.attributes.harga_pcs
}

function countTotalHarga(data: DetailOrderBarangAttributes[]): number {
    let total = 0;
    data.map((item) => {
        total += getTotalPerItem(item)
    })
    return total
}

function getItemBySearch(data: DetailOrderBarangAttributes[], seacrh: string): DetailOrderBarangAttributes[] {
    return data.filter((item) => {
        return item.barang.data.attributes.nama.includes(seacrh) || item.barang.data.id.toString().includes(seacrh)
    })
}






// PAGE COMPONENT
function ProsesOrder({ navigation, route }: any) {
    const listDetailOrders: DetailOrderBarangAttributes[] = route?.params?.listDetailOrders;
    const outlet: OutletAttributes = route?.params?.outlet;
    const { profile, user } = useContext(AuthContext)

    const [dataListDetailOrder, setDataListDetailOrder] = useState<DetailOrderBarangAttributes[]>(listDetailOrders);
    const { search, handleSearch } = useSearch();
    const { control, handleSubmit } = useForm()
    const { visible, toggleModal } = useModal();


    function resetNavigasi() {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'TabApp' },
                ],
            })
        );
    }

    function ProseOrder() {
        if (!user.jwt || !profile) return
        if (!profile.salesman || !profile.salesman.periode) return
        const token = user.jwt;

        const orderData = {
            outlet: outlet.id,
            periode: profile.salesman.periode.id,
            salesman: profile.salesman.id,
            status: 'ok',
            total_gross: TOTAL_HARGA,
            waktu_order: new Date().toISOString()
        }


        KonfirmasiOrder(token, orderData, ITEM_BUY);
        toggleModal();
        resetNavigasi()
    }

    const RenderFooterModal = () => {
        return (
            <Button
                onPress={ProseOrder}
            > Proses</Button >
        )
    }

    const ITEM_BUY = useMemo(() => deleteIsEmpty(dataListDetailOrder), [listDetailOrders, dataListDetailOrder])

    const TOTAL_HARGA = useMemo(() => countTotalHarga(ITEM_BUY), [dataListDetailOrder])

    const RESULT_SEARCH = useMemo(() => getItemBySearch(ITEM_BUY, search), [search, dataListDetailOrder])


    return (
        <SafeAreaView className='flex-1 w-full'>
            <Header title='Proses Order' />
            <View style={{ gap: 8 }} className='p-4 flex flex-row'>
                <Input value={search} onChangeText={handleSearch} classNameContainer='w-3/4' icon={require('../../assets/icons/iconSearchBlue.png')} control={control} name='search' placeholder='Cari ID/Nama' />
                <Button onPress={() => navigation.navigate('OrderBarang', { listDetailOrders: dataListDetailOrder, outlet })} icon={require('./../../assets/icons/iconPencilWhite.png')}>Barang</Button>
            </View>
            <FlatList
                data={RESULT_SEARCH}
                renderItem={({ item }) => <CardOrderBarang detailOrder={item} />}
                style={{ marginHorizontal: 16 }}
                className='bg-primary p-4 rounded-t'
            />
            <View className='bg-primary px-4 mx-4 rounded-b'>
                <View className='border-[1px] border-white-0 px-4 py-2 flex flex-row rounded-xl justify-between my-4 items-center'>
                    <Text className='text-base text-white-0'>Total Harga</Text>
                    <Text className='text-white-0 text-2xl font-bold'>{formatRupiah(TOTAL_HARGA)}</Text>
                </View>
            </View>
            <View style={{ gap: 16 }} className='w-full flex flex-row p-4'>
                <Button onPress={() => setDataListDetailOrder([])} classNameContainer='flex-1 border-[2px] border-primary bg-tranparent' classNameText='text-primary'>Reset</Button>
                <Button onPress={toggleModal} classNameContainer='flex-1'>Selesai</Button>
            </View>
            <ModalBottom visible={visible} onRequestClose={toggleModal} modalTitle='Konfirmasi' footerComponents={<RenderFooterModal />}>
                <LabelValue label='Id Outlet' value={'#' + outlet?.id} classNameValue=' text-primary' />
                <LabelValue label='Nama Outlet' value={outlet?.nama} />
                <LabelValue label='Sisa Limit' value={parseInt(outlet.target) - TOTAL_HARGA > 0 ? parseInt(outlet.target) - TOTAL_HARGA : 0} />
                <LabelValue label='Jumlah item' value={ITEM_BUY.length} />
                <LabelValue label='Total Harga' value={formatRupiah(TOTAL_HARGA)} />
            </ModalBottom>
        </SafeAreaView>
    )
}

export default ProsesOrder