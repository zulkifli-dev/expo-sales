import Badge from '@components/Badge'
import Button from '@components/Button/Button';
import LabelValue from '@components/LabelValue';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/modal'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native'
function CardHistory() {

    return (
        <>
            <TouchableOpacity style={{ gap: 8 }} className='p-4 border-[1px] border-gray-300 my-1'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-base flex-1'><Text className='font-bold text-primary'>#300085 - KS IAN MOENGKO</Text></Text>
                    <View className=''>
                        <Text className='text-xs text-right'>Tanggal Order</Text>
                        <Text className='font-semibold text-sm text-right'>28.09.2023</Text>
                    </View>
                </View>
                <View className='flex flex-row justify-between'>
                    <View>
                        <Text className='text-base'>WS - WHOSALLER/GROSIR</Text>
                        <Text>Jl. Jalan</Text>
                    </View>
                    <Text className='font-semibold text-xl text-right text-primary'>Rp 243.600</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default CardHistory