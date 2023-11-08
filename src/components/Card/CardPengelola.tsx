import MoreButton from '@components/Button/MoreButton'
import HeaderTitle from '@components/HeaderTitle'
import { Image, TouchableOpacity, View } from 'react-native'

function CardPengelola() {
    return (
        <View style={{ gap: 8 }} className='flex flex-row bg-white-0 p-3 rounded-xl items-center my-2'>
            <Image style={{ width: 64, height: 64 }} source={require('../../assets/image/avatar.png')} />
            <HeaderTitle title='Zulkifli' description='08123456789' />
            <MoreButton />
        </View>
    )
}

export default CardPengelola