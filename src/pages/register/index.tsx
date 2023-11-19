import Button from '@components/Button/Button';
import Input from '@components/Input/Input';
import SafeAreaScroll from '@components/SafeAreaScroll';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { height } = Dimensions.get('screen');

export default function Register({ navigation }: { navigation: any }) {
    const { control, handleSubmit } = useForm();

    const handleRegister = () => {
        // Handle registration logic here
        
    };

    return (
        <SafeAreaView className='flex-1 bg-white-10'>
            <ScrollView>
                <View className='w-full bg-primary rounded-b-3xl flex items-center justify-center' style={{ height: height * 0.3 }}>
                    <Text className='text-4xl font-bold text-white-0'>Lets Get Started!</Text>
                </View>
                <View style={{ gap: 24 }} className='flex flex-col items-center p-4'>
                    <Text className='text-4xl font-bold text-primary mt-8'>Selamat Datang</Text>
                    <Input control={control} name='nama_lengkap' placeholder='Nama Lengkap' icon={require('../../assets/icons/iconUserBlue.png')} />
                    <Input control={control} name='username' placeholder='Username' icon={require('../../assets/icons/iconUserBlue.png')} />
                    <Input control={control} name='email' keyboardType='email-address' placeholder='Email' icon={require('../../assets/icons/iconMailBlue.png')} />
                    <Input control={control} name='password' placeholder='Password' icon={require('../../assets/icons/iconLockBlue.png')} secureTextEntry />
                    <Input control={control} name='konfirmasi_password' placeholder='Konfirmasi Password' icon={require('../../assets/icons/iconLockBlue.png')} secureTextEntry />
                    <Button classNameContainer='w-full' onPress={handleSubmit(handleRegister)}>Register</Button>
                    <Text className='text-sm'>Already have an account? <Text onPress={() => navigation.navigate('Login')} className='font-bold'>Log In</Text></Text>
                </View>
                <SafeAreaScroll />
            </ScrollView>
        </SafeAreaView>
    );
}