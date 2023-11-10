import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import { BASE_URL } from '../../constant/url'
import { AuthContext } from '@context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Dimensions, Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height } = Dimensions.get('screen');
function Login({ navigation }: { navigation: any }) {

    const { control, handleSubmit, } = useForm()
    const { setUser } = useContext(AuthContext)

    async function handleLogin(data: any) {

        const result = await axios.post(BASE_URL('/auth/local'), data)

        AsyncStorage.setItem('userData', JSON.stringify(result.data));
        setUser(result.data);
    }
    return (
        <SafeAreaView className='flex-1 bg-white-10'>
            <ScrollView>
                <View className='w-full bg-primary rounded-b-3xl flex items-center justify-center' style={{ height: height * 0.4 }}>
                    <Image style={{ width: 266, height: 123, resizeMode: 'contain' }} source={require('../../assets/image/logoHSM.png')} />
                </View>
                <View style={{ gap: 24 }} className='flex flex-col items-center p-4'>
                    <Text className='text-4xl font-bold text-primary mt-8'>Selamat Datang</Text>
                    <Input isUseHooksForm control={control} name='identifier' placeholder='Username' icon={require('../../assets/icons/iconUserBlue.png')} />
                    <Input isUseHooksForm control={control} name='password' placeholder='Password' icon={require('../../assets/icons/iconLockBlue.png')} secureTextEntry />
                    <Button classNameContainer='w-full' onPress={handleSubmit(handleLogin)}>Login</Button>
                    <Text className='text-sm'>Don’t have an account? <Text onPress={() => navigation.navigate('Register')} className='font-bold'>Sign Up</Text></Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Login