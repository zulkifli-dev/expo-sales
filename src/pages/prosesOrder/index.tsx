import Button from '@components/Button/Button'
import CardOrderBarang from '@components/Card/CardOrderBarang'
import CardOutlet from '@components/Card/CardOutlet'
import Header from '@components/Header'
import Input from '@components/Input/Input'
import LabelValue from '@components/LabelValue'
import ModalBottom from '@components/Modal/ModalBottom'
import SafeAreaScroll from '@components/SafeAreaScroll'
import useModal from '@hooks/modal'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function ProsesOrder({ navigation }: { navigation: any }) {
    const { control, handleSubmit } = useForm()
    const { visible, toggleModal } = useModal();

    const RenderFooterModal = () => {
        return (
            <Button onPress={() => navigation.navigate('TabApp')}>Proses</Button>
        )
    }

    return (
        <SafeAreaView className='flex-1 w-full'>
            <Header title='Proses Order' isButtonBack />
            <View style={{ gap: 8 }} className='p-4 flex flex-row'>
                <Input classNameContainer='w-3/4' icon={require('../../assets/icons/iconSearchBlue.png')} control={control} name='search' placeholder='Cari ID/Nama' />
                <Button onPress={() => navigation.navigate('OrderBarang')} icon={require('./../../assets/icons/iconPencilWhite.png')}>Barang</Button>
            </View>
            <FlatList
                data={new Array(8).fill(0)}
                renderItem={() => <CardOrderBarang />}
                style={{ marginHorizontal: 16 }}
                className='bg-primary p-4 rounded-t'
            />
            <View className='bg-primary px-4 mx-4 rounded-b'>
                <View className='border-[1px] border-white-0 px-4 py-2 flex flex-row rounded-xl justify-between my-4 items-center'>
                    <Text className='text-base text-white-0'>Total Harga</Text>
                    <Text className='text-white-0 text-2xl font-bold'>Rp. 100.000</Text>
                </View>
            </View>
            <View style={{ gap: 16 }} className='w-full flex flex-row p-4'>
                <Button classNameContainer='flex-1 border-[2px] border-primary bg-tranparent' classNameText='text-primary'>Reset</Button>
                <Button onPress={toggleModal} classNameContainer='flex-1'>Selesai</Button>
            </View>
            <ModalBottom visible={visible} onRequestClose={toggleModal} modalTitle='Konfirmasi' footerComponents={<RenderFooterModal />}>
                <LabelValue label='Id Outlet' value='#351517' classNameValue=' text-primary' />
                <LabelValue label='Nama Outlet' value='KS IAN MOENGKO' />
                <LabelValue label='Sisa Limit' value='Rp 100.000' />
                <LabelValue label='Jumlah item' value='5' />
                <LabelValue label='Total Harga' value='Rp 500.000' />
            </ModalBottom>
        </SafeAreaView>
    )
}

export default ProsesOrder