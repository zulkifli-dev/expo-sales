import Badge from '@components/Badge'
import HeaderTitle from '@components/HeaderTitle'
import { Image, Text, TouchableOpacity, View } from 'react-native'

function CardReport() {
    return (
        <TouchableOpacity style={{ gap: 4 }} className='flex flex-col bg-white-0 p-3 rounded-xl items-start my-2'>
            <View style={{ gap: 8 }} className='flex flex-row items-start border-b-[0.5px] mb-2 pb-2'>
                <Image style={{ width: 64, height: 64 }} source={require('../../assets/image/avatar.png')} />
                <HeaderTitle title='Zulkifli' description='08123456789' />
                <Badge type='bangunan'>Bangunan</Badge>
            </View>
            <View style={{ gap: 8 }} className='flex flex-col'>
                <Text className='text-xs font-light'>Keterangan</Text>
                <Text className='text-xs text-justify'>Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CardReport