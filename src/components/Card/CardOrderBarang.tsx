import Badge from '@components/Badge'
import Button from '@components/Button/Button';
import LabelValue from '@components/LabelValue';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/modal'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native'
function CardOrderBarang() {
    return (
        <View style={{ gap: 8 }} className='p-4  bg-white-0 my-2 rounded-xl'>
            <Text className='flex-1'>#351517</Text>
            <Text className='text-base text-primary font-bold'>LE Menirale  24BTLx600ML</Text>
            <LabelValue label='Gross' value={'Rp. 2.000.000'} classNameValue='font-normal' />
            <LabelValue label='Quantity' value={2} classNameValue='font-normal' />
            <LabelValue label='Total' value={'Rp. 2.000.000'} classNameValue='text-primary' />
        </View>
    )
}

export default CardOrderBarang