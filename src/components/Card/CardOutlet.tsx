import Badge from '@components/Badge'
import Button from '@components/Button/Button';
import LabelValue from '@components/LabelValue';
import Modal from '@components/Modal/Modal';
import { BASE_URL } from '../../constant/url';
import useModal from '@hooks/modal'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OutletAttributes, statusType } from '@type/order';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge';
import { AuthContext } from '@context/authContext';


function CardOutlet({ outlet }: { outlet: OutletAttributes }) {
    const { user, getProfile } = useContext(AuthContext);
    const { visible, toggleModal } = useModal();
    const statusToggle = useModal();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [selectStatus, setSelectStatus] = useState<statusType>(outlet.status);

    const RenderFooter = () => {
        return (
            <>
                <View style={{ gap: 12 }} className='flex flex-row w-full'>
                    <Button size='small' onPress={statusToggle.toggleModal} classNameContainer='flex-1'>Ubah Status</Button>
                    <Button size='small' onPress={() => { toggleModal(), navigation.navigate('ProsesOrder', { outlet }) }} classNameContainer='flex-1'>Order by Phone</Button>
                </View>
                <View style={{ gap: 12 }} className='flex flex-row w-full'>
                    <Button size='small' onPress={toggleModal} classNameContainer='flex-1'>Tutup</Button>
                </View>
            </>
        )
    }

    const updateStatus = (status: statusType) => {
        setSelectStatus(status);

        axios.put(BASE_URL('/outlets/' + outlet?.id), { data: { status: status } }, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        }).then((response) => {
            getProfile(user.jwt || '');
        }).catch((error) => {
            alert('Gagal')
            // console.log(error);
        }).finally(() => {
            statusToggle.toggleModal();
            toggleModal();
        })
    }

    return (
        <>
            <TouchableOpacity onPress={toggleModal} style={{ gap: 8 }} className='p-4 border-[1px] border-gray-300 my-1'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-base flex-1'><Text className='font-bold text-primary'>{outlet?.id}</Text> - {outlet?.nama}</Text>
                    <Badge containerClassname={outlet?.status === 'Selesai' ? 'bg-green-800' : 'bg-red-800'} textClassname='text-white' >{outlet?.status}</Badge>
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
            <Modal style={{ gap: 8 }} visible={statusToggle.visible} onRequestClose={statusToggle.toggleModal} modalTitle='Ubah Status'>
                <View style={{ gap: 8 }} className='flex flex-row'>
                    <Button onPress={() => updateStatus('Toko Tutup')} classNameContainer={twMerge('p-1 flex-1 h-20', selectStatus === 'Toko Tutup' ? 'bg-red-800' : 'bg-gray-500')}>Toko Tutup</Button>
                    <Button onPress={() => updateStatus('Stop Cukup')} classNameContainer={twMerge('p-1 flex-1 h-20 bg-gray-500', selectStatus === 'Stop Cukup' ? 'bg-red-800' : 'bg-gray-500')}>Stok Cukup</Button>
                </View>
                <View style={{ gap: 8 }} className='flex flex-row'>
                    <Button onPress={() => updateStatus('Beli Di Tempat Lain')} classNameContainer={twMerge('p-1 flex-1 h-20 bg-gray-500', selectStatus === 'Beli Di Tempat Lain' ? 'bg-red-800' : 'bg-gray-500')}>Beli Di Tempat Lain</Button>
                    <Button onPress={() => updateStatus('Bencana Alam')} classNameContainer={twMerge('p-1 flex-1 h-20 bg-gray-500', selectStatus === 'Bencana Alam' ? 'bg-red-800' : 'bg-gray-500')}>Bencana Alam</Button>
                </View>
                <View style={{ gap: 8 }} className='flex flex-row'>
                    <Button onPress={() => updateStatus('Tidak DI Kunjungi')} classNameContainer={twMerge('p-1 flex-1 h-20 bg-gray-500', selectStatus === 'Tidak DI Kunjungi' ? 'bg-red-800' : 'bg-gray-500')}>Tidak Di Kunjungi</Button>
                    <Button onPress={() => updateStatus('Selesai')} classNameContainer={twMerge('p-1 flex-1 h-20 bg-gray-500', selectStatus === 'Selesai' ? 'bg-green-700' : 'bg-gray-500')}>Selesai</Button>
                </View>
            </Modal>
        </>
    )
}

export default CardOutlet