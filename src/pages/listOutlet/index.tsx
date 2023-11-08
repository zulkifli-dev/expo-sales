import Button from '@components/Button/Button'
import CardOutlet from '@components/Card/CardOutlet'
import Header from '@components/Header'
import Input from '@components/Input/Input'
import { AuthContext } from '@context/authContext'
import moment from 'moment'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function ListOutlet() {
    const { profile } = useContext(AuthContext);
    const { control, handleSubmit } = useForm()

    return (
        <SafeAreaView className='flex-1 w-full'>
            <Header title='List Outlet' isButtonBack />
            <View style={{ gap: 8 }} className='p-4 flex flex-row'>
                <Input classNameContainer='w-3/4' icon={require('../../assets/icons/iconSearchBlue.png')} control={control} name='search' placeholder='Cari ID/Nama' />
                <Button icon={require('./../../assets/icons/iconPlusWhite.png')}>Outlet</Button>
            </View>
            <View style={{ gap: 8 }} className='flex flex-row p-4'>
                <View className='border-[1px] border-primary px-4 py-2 rounded flex items-center flex-1'>
                    <Text className='text-md text-primary'>Tanggal</Text>
                    <Text className='text-base font-semibold text-primary'>{moment(new Date()).format('DD/MM/YYYY')}</Text>
                </View>
                <View className='border-[1px] border-primary px-4  py-2 rounded flex items-center flex-1'>
                    <Text className='text-md text-primary'>Target</Text>
                    <Text className='text-base font-semibold text-primary'>{profile?.salesman?.target_outlet ?? 0}</Text>
                </View>
                <View className='border-[1px] border-primary px-4  py-2 rounded flex items-center flex-1'>
                    <Text className='text-md text-primary'>Sukses</Text>
                    <Text className='text-base font-semibold text-primary'>{profile?.salesman?.aktual_outlet}</Text>
                </View>
            </View>
            <FlatList
                data={profile?.salesman?.outlets}
                renderItem={({ item }) => <CardOutlet key={item.id} outlet={item} />}
                style={{ marginHorizontal: 16 }}
            />

        </SafeAreaView>
    )
}

export default ListOutlet