import Badge from '@components/Badge'
import Button from '@components/Button/Button';
import LabelValue from '@components/LabelValue';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/modal'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OutletAttributes } from '@type/order';
import { Text, TouchableOpacity, View } from 'react-native'
function CardOutlet({ outlet }: { outlet: OutletAttributes }) {
    const { visible, toggleModal } = useModal();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const RenderFooter = () => {
        return (
            <View style={{ gap: 12 }} className='flex flex-row w-full'>
                <Button size='small' onPress={toggleModal} classNameContainer='flex-1'>Ubah Status</Button>
                <Button size='small' onPress={() => { toggleModal(), navigation.navigate('ProsesOrder', { outlet }) }} classNameContainer='flex-1'>Order by Phone</Button>
            </View>
        )
    }
    return (
        <>
            <TouchableOpacity onPress={toggleModal} style={{ gap: 8 }} className='p-4 border-[1px] border-gray-300 my-1'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-base flex-1'><Text className='font-bold text-primary'>{outlet?.id}</Text> - {outlet?.nama}</Text>
                    <Badge type='bangunan'>Stock Cukup</Badge>
                </View>
                <View className='flex flex-row justify-between'>
                    <View>
                        <Text className='text-base'>{outlet?.kelurahan} - {outlet?.kecamatan}</Text>
                        <Text>Jl. Jalan</Text>
                    </View>
                    <View className=''>
                        <Text className='text-xs text-right'>Tanggal Terakhir Order</Text>
                        <Text className='font-semibold text-sm text-right'>28.09.2023</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal transparent visible={visible} onRequestClose={toggleModal} footerComponents={<RenderFooter />}>
                <LabelValue label='Nomor Outlet' value={outlet.id} />
                <LabelValue label='Nama Outle' value={outlet.nama} />
                <LabelValue label='Jenis Outlet' value={outlet.type} />
                <LabelValue label='Alamat' value={outlet.alamat} />
                <LabelValue label='Status' value={outlet.status} />
            </Modal >
        </>
    )
}

export default CardOutlet