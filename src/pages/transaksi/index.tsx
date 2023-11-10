import CardHistory from '@components/Card/CardHistory'
import Header from '@components/Header'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Transaksi() {
    return (
        <SafeAreaView>
            <Header title='History Transaksi' isButtonBack />
            <View className='mx-4 my-2'>
                <CardHistory />
            </View>
        </SafeAreaView>
    )
}

export default Transaksi