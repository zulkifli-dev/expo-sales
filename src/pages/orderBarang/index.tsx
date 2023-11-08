import Header from '@components/Header'
import Counter from '@components/Input/Counter'
import Input from '@components/Input/Input'
import useSearch from '@hooks/search'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function OrderBarang() {
    const { search, handleSearch } = useSearch();

    return (
        <SafeAreaView className='flex-1 w-full'>
            <Header title='Proses Order' isButtonBack />
            <View style={{ gap: 8 }} className='p-4 flex flex-row'>
                <Input classNameContainer='w-3/4' icon={require('../../assets/icons/iconSearchBlue.png')} name='search' placeholder='Cari ID/Nama' value={search} onChangeText={handleSearch} />
            </View>
            <View style={{ gap: 8 }} className='p-4 border-2 border-gray-200 rounded-xl flex-row items-center'>
                <View className='flex-1 flex flex-col'>
                    <Text className='text-xl font-bold text-primary'>LE Menirale 24BTLx600ML</Text>
                    <Text className='text-primary'>Rp. 2.000.000</Text>
                </View>
                <Counter maxCounter={10} />
            </View>
        </SafeAreaView>
    )
}

export default OrderBarang