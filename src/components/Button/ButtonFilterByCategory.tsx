import { BASE_URL } from '../../constant/url';
import { AuthContext } from '@context/authContext';
import useModal from '@hooks/modal'
import { OutletAttributes } from '@type/order';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge';
import Button from './Button';
interface getOutletType {
    id: string
    attributes: OutletAttributes
}
function ButtonFilterByCategory({ setSelectOutletProps }: { setSelectOutletProps: (value: string) => void }) {
    const { profile, user } = useContext(AuthContext);
    const [outlets, setOutlets] = useState<getOutletType[]>([])
    const [selectOutlet, setSelectOutlet] = useState('Semua')

    useEffect(() => {

        function getOutlet() {
            const url = BASE_URL(`/outlets`)
            axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            }).then((response) => {
                const { data } = response.data
                setOutlets(data)
            }).catch((error) => {
                // console.log(error)
            })
        }
        getOutlet();
    }, []);

    const { visible, toggleModal } = useModal();

    function onSelectOutlet(value: string) {
        setSelectOutlet(value)
        setSelectOutletProps(value)
        toggleModal()
    }
    return (
        <View className='relative flex-1 flex flex-row justify-end'>
            <Button size='small' classNameContainer='py-1' classNameText='text-base px-4' onPress={toggleModal}>
                <Text>{selectOutlet}</Text>
            </Button>
            {visible && (
                <View style={{ gap: 8 }} className='absolute z-50 right-0 top-0 bg-white-0 px-4 py-2 rounded'>
                    <Text onPress={() => onSelectOutlet('Semua')} className={twMerge('text-primary text-base', selectOutlet === 'Semua' && 'font-bold')}>Semua</Text>
                    <FlatList
                        data={outlets}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Text onPress={() => onSelectOutlet(item.attributes.nama)} className={twMerge('text-primary text-base mb-1', selectOutlet === item.attributes.nama && 'font-bold')}>{item.attributes.nama}</Text>
                        )}
                        style={{ gap: 8 }}
                    />
                </View>
            )}
        </View>
    )
}

export default ButtonFilterByCategory