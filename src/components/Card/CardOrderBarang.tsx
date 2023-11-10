import LabelValue from '@components/LabelValue';
import { DetailOrderBarangAttributes } from '@pages/prosesOrder';
import formatRupiah from '../../tools/formatRupiah'
import { Text, View } from 'react-native'
import { useMemo } from 'react';
function CardOrderBarang({ detailOrder }: { detailOrder: DetailOrderBarangAttributes }) {
    const { barang } = detailOrder;
    const { attributes } = barang.data;

    const totalPcs = useMemo(() => detailOrder.jumlah_pcs * attributes.harga_pcs, [detailOrder])
    const totalPack = useMemo(() => detailOrder.jumlah_pack * attributes.harga_pack, [detailOrder])
    const jumlahPcs = useMemo(() => detailOrder.jumlah_pcs, [detailOrder])
    const jumlahPack = useMemo(() => detailOrder.jumlah_pack, [detailOrder])

    return (
        <View style={{ gap: 2 }} className='p-4  bg-white-0 my-2 rounded-xl'>
            <Text className='flex-1'>#{detailOrder.barang.data.id}</Text>
            <Text className='text-base text-primary font-bold'>{attributes?.nama}</Text>
            <LabelValue label='Gross  per pcs' value={formatRupiah(attributes.harga_pcs)} classNameValue='font-normal' />
            <LabelValue label='Gross  per pack' value={formatRupiah(attributes.harga_pack)} classNameValue='font-normal' />
            <View style={{ gap: 8 }} className='flex flex-row justify-between border-secondary'>
                <View style={{ gap: 2 }} className='flex-1 items-center border-[1px] border-primary rounded '>
                    <Text className='text-white-0 bg-primary w-full text-center'>Pcs</Text>
                    <View className='flex flex-row justify-between w-full p-2'>
                        <Text className='text-center flex-1'>{jumlahPcs}</Text>
                        <Text className='text-center flex-2'>{formatRupiah(totalPcs)}</Text>
                    </View>
                </View>
                <View style={{ gap: 2 }} className='flex-1 items-center border-[1px] border-primary rounded'>
                    <Text className='text-white-0 bg-primary w-full text-center'>Pack</Text>
                    <View className='flex flex-row justify-between w-full  p-2'>
                        <Text className='text-center flex-1'>{jumlahPack}</Text>
                        <Text className='text-center flex-2'>{formatRupiah(totalPack)}</Text>
                    </View>
                </View>
            </View>
            <LabelValue label='Total' value={formatRupiah(totalPcs + totalPack)} classNameValue='text-primary' />
        </View>
    )
}

export default CardOrderBarang