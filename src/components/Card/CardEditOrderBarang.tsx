import Counter from '@components/Input/Counter'
import Input from '@components/Input/Input'
import LabelValue from '@components/LabelValue'
import useModal from '@hooks/modal'
import userCounter, { returnCounter } from '@hooks/userCounter'
import { DetailOrderBarangAttributes } from '@pages/prosesOrder'
import formatRupiah from '@tools/formatRupiah'
import { DetailOrderAttributes } from '@type/order'
import React, { useEffect } from 'react'
import { Text, View } from 'react-native'

interface CardEditOrderBarangProps {
    detailOrder: DetailOrderBarangAttributes,
    onUpdateByIndex: (indexOfArray: number, data: DetailOrderBarangAttributes) => void,
    indexOfArray: number,
}
function CardEditOrderBarang(props: CardEditOrderBarangProps) {
    const { barang, jumlah_pack, jumlah_pcs } = props.detailOrder
    const errorPcs = useModal()
    const errorPack = useModal()


    function validasiStok(value: string, key: 'jumlah_pack' | 'jumlah_pcs') {
        const valueNumber = parseInt(value) || NaN;
        if (typeof (valueNumber) !== 'number') return

        errorPack.setVisible(false)
        errorPcs.setVisible(false)

        if (key === 'jumlah_pcs') {
            // cek stok pcs
            if (barang.data.attributes.saldo_pcs >= valueNumber) {
                return props.onUpdateByIndex(props.indexOfArray, { ...props.detailOrder, jumlah_pcs: valueNumber })
            }
            errorPcs.setVisible(true)
        } else {
            // cek stok pcs
            if (barang.data.attributes.saldo_pack >= valueNumber) {
                return props.onUpdateByIndex(props.indexOfArray, { ...props.detailOrder, jumlah_pack: valueNumber })
            }
            errorPack.setVisible(true)
        }

    }


    const { attributes } = barang.data;
    return (
        <View style={{ gap: 8 }} className='p-4 border-2 border-gray-200 rounded-xl flex-col my-2'>
            <Text className='text-lg'>#{barang.data.id}</Text>
            <Text className='text-xl font-bold text-primary'>{attributes.nama}</Text>
            <LabelValue label={'Gross  per pcs'} value={formatRupiah(attributes.harga_pcs)} classNameValue='font-normal' />
            <LabelValue label={'Gross  per pack'} value={formatRupiah(attributes.harga_pack)} classNameValue='font-normal' />
            <View style={{ gap: 8 }} className='flex flex-row justify-between border-secondary'>
                <View style={{ gap: 2 }} className={('flex-1 items-center border-[1px] border-primary rounded')}>
                    <Text className='text-white-0 bg-primary w-full text-center'>Pcs</Text>
                    <View style={{ gap: 4 }} className='flex flex-row justify-center w-full p-2 items-center'>
                        <Input keyboardType='numeric' value={props.detailOrder.jumlah_pcs.toString()} onChangeText={(e) => validasiStok(e, 'jumlah_pcs')} classNameContainer={errorPcs.visible ? 'border-red-500' : ''} />
                        <Text className='text-center'>/{props.detailOrder.barang.data.attributes.saldo_pcs}</Text>
                    </View>
                </View>
                <View style={{ gap: 2 }} className='flex-1 items-center border-[1px] border-primary rounded'>
                    <Text className='text-white-0 bg-primary w-full text-center'>Pack</Text>
                    <View style={{ gap: 4 }} className='flex flex-row justify-center w-full p-2 items-center'>
                        <Input keyboardType='numeric' value={props.detailOrder.jumlah_pack.toString()} onChangeText={e => validasiStok(e, 'jumlah_pack')} classNameContainer={errorPack.visible ? 'border-red-500' : ''} />
                        <Text className='text-center'>/{props.detailOrder.barang.data.attributes.saldo_pack}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CardEditOrderBarang