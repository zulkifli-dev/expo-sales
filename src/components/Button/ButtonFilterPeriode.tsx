import { BASE_URL } from '../../constant/url';
import { AuthContext } from '@context/authContext';
import useModal from '@hooks/modal'
import { PeriodeAttributes } from '@type/order';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge';
import Button from './Button';

/**
 * This is the ButtonFilterPeriode component.
 * It renders a button and a modal with a list of periodes.
 */

interface getPeriodeType {
    id: string
    attributes: PeriodeAttributes
}
function ButtonFilterPeriode({ setSelectPeriodeProps }: { setSelectPeriodeProps: (value: string) => void }) {
    const { profile, user } = useContext(AuthContext);
    const [periodes, setPeriodes] = useState<getPeriodeType[]>([])
    const [selectPeriode, setSelectPeriode] = useState('Semua')

    useEffect(() => {

        function getPeride() {
            const url = BASE_URL(`/periodes`)

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
    }, []);

    const { visible, toggleModal } = useModal();

    function onSelectPeriode(value: string) {
        setSelectPeriode(value)
        setSelectPeriodeProps(value)
        toggleModal()
    }

    return (
        <View className='relative flex-1 flex flex-row'>
            <Button size='small' classNameContainer='py-1' classNameText='text-base px-4' onPress={toggleModal}>
                <Text>{selectPeriode}</Text>
            </Button>
            {visible && (
                <View style={{ gap: 8 }} className='absolute z-50 left-0 top-0 bg-white-0 px-4 py-2 rounded'>
                    <Text onPress={() => onSelectPeriode('Semua')} className={twMerge('text-primary text-base', selectPeriode === 'Semua' && 'font-bold')}>Semua</Text>
                    <FlatList
                        data={periodes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Text onPress={() => onSelectPeriode(item.attributes.nama)} className={twMerge('text-primary text-base', selectPeriode === item.attributes.nama && 'font-bold')}>{item.attributes.nama}</Text>
                        )}
                    />
                </View>
            )}
        </View>
    )
}

export default ButtonFilterPeriode
