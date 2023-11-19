import Button from '@components/Button/Button'
import ButtonAdd from '@components/Button/ButtonAdd'
import CardOutlet from '@components/Card/CardOutlet'
import Header from '@components/Header'
import Input from '@components/Input/Input'
import { AuthContext } from '@context/authContext'
import useModal from '@hooks/modal'
import moment from 'moment'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormOutlet from './FormOutlet'
import { addOutlet } from '@service/outlet'
import { BASE_URL } from '../../constant/url'
import axios from 'axios'
import formatRupiah from '@tools/formatRupiah'
import useSearch from '@hooks/search'

function ListOutlet() {
    const { profile, user, getProfile, isLoading } = useContext(AuthContext);
    const { control, handleSubmit, reset } = useForm()

    const toggleAdd = useModal();
    const [periodes, setPeriodes] = useState<any>([])

    const { search, handleSearch } = useSearch();
    function handleAddOutlet(dataProps: any) {
        const data = {
            ...dataProps,
            'salesman': profile?.salesman?.id
        }
        addOutlet(user.jwt || '', data)
        reset()
        getProfile(user.jwt || '')
        toggleAdd.toggleModal()
    }

    useEffect(() => {
        if (!profile?.salesman.periode?.id) return
        function getPeride() {
            const url = BASE_URL(`/orders?populate=*&filters[periode]=${profile?.salesman.periode?.id}&filters[salesman][id]=${profile?.salesman?.id}`)

            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            }).then((response) => {
                const { data } = response.data
                setPeriodes(data)
            }).catch((error) => {
                // console.log(error)
            })
        }
        getPeride();
    }, [profile]);

    const TOTAL_OMSET = useMemo(() => {
        let total = 0
        periodes.map((item: any) => {
            total += item.attributes.total_gross
            // console.log(item);
        })

        return total
    }, [periodes])

    const FILTER_OUTLET = useMemo(() => {
        console.log(search);

        return profile?.salesman?.outlets?.filter((outlet) => {
            return outlet.nama.toLowerCase().includes(search.toLocaleLowerCase());
        })
    }, [profile, search])

    return (
        <SafeAreaView className='flex-1 w-full'>
            <Header title='List Outlet' isButtonBack />
            <View style={{ gap: 8 }} className='p-4 flex flex-row'>
                <Input value={search} onChangeText={handleSearch} classNameContainer='w-3/4' icon={require('../../assets/icons/iconSearchBlue.png')} control={control} name='search' placeholder='Cari ID/Nama' />
                <ButtonAdd footerComponents={
                    <View style={{ gap: 8 }}>
                        <Button onPress={handleSubmit(handleAddOutlet)}>Simpan</Button>
                        <Button onPress={toggleAdd.toggleModal}>Tutup</Button>
                    </View>
                } transparent modalTitle='Tambah Outlet' visible={toggleAdd.visible} toggleModal={toggleAdd.toggleModal}>
                    <FormOutlet control={control} />
                </ButtonAdd>
            </View>
            <View style={{ gap: 8 }} className='flex flex-row p-4'>
                <View className='border-[1px] border-primary px-4  py-2 rounded flex items-center flex-1'>
                    <Text className='text-md text-primary'>Target</Text>
                    <Text className='text-base font-semibold text-primary'>{formatRupiah(profile?.salesman?.target_outlet ?? 0)}</Text>
                </View>
                <View className='border-[1px] border-primary px-4  py-2 rounded flex items-center flex-1'>
                    <Text className='text-md text-primary'>Sukses</Text>
                    <Text className='text-base font-semibold text-primary'>{formatRupiah(TOTAL_OMSET)}</Text>
                </View>
            </View>
            <FlatList
                // onRefresh={() => getProfile(user.jwt || '')}
                // refreshing={isLoading}
                data={FILTER_OUTLET}
                renderItem={({ item }) => <CardOutlet key={item.id} outlet={item} />}
                style={{ marginHorizontal: 16 }}
            />

        </SafeAreaView>
    )
}

export default ListOutlet