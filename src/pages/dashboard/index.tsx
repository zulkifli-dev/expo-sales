import Button from '@components/Button/Button'
import Header from '@components/Header'
import LabelValue from '@components/LabelValue'
import SafeAreaScroll from '@components/SafeAreaScroll'
import { AuthContext } from '@context/authContext'
import { useIsFocused } from '@react-navigation/native'
import React, { useContext, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Dashboard({ navigation }: { navigation: any }) {
    const { user, profile, logout, getProfile } = useContext(AuthContext);
    const isFocused = useIsFocused();

    useEffect(() => { getProfile(user.jwt ?? "") }, [isFocused])


    return (
        <SafeAreaView className='flex-1'>
            <Header title='Dashboard Salesman' />
            <ScrollView className='p-4'>
                <View className='border-[1px] border-secondary rounded-2xl p-4'>
                    <Text className='text-2xl text-primary font-semibold'>Sales {profile?.username}</Text>
                    <LabelValue label='Tanggal' value={'05 November 2023'} />
                    <LabelValue label='Week' value={24} />
                    <LabelValue label='Periode' value={profile?.salesman?.periode?.nama ?? ""} />
                </View>
                <View className='border-[1px] border-secondary rounded-2xl p-4 my-6'>
                    <Text className='text-2xl text-primary font-semibold'>Outlet</Text>
                    <LabelValue label='Outlet' value={profile?.salesman?.outlets?.length ?? 0} />
                    <LabelValue label='Target' value={profile?.salesman?.target_outlet ?? 0} />
                    <LabelValue label='Aktual' value={profile?.salesman?.aktual_outlet ?? 0} />
                </View>
                <View className='border-[1px] border-secondary rounded-2xl p-4'>
                    <Text className='text-2xl text-primary font-semibold'>Omset</Text>
                    <LabelValue label='Omset' value={'2.000.000'} />
                    <LabelValue label='Aktual' value={'5x'} />
                </View>
                <View style={{ gap: 8 }} className='flex flex-row mt-8'>
                    <Button
                        onPress={() => logout()}
                        classNameContainer='bg-tranparent border-[1px]  border-primary flex-1'
                        classNameText='text-primary'
                    >
                        Keluar
                    </Button>
                    <Button onPress={() => navigation.navigate('ListOutlet')} classNameContainer='bg-primary flex-1'>Next</Button>
                </View>
                <SafeAreaScroll />
            </ScrollView>
        </SafeAreaView >
    )
}

export default Dashboard