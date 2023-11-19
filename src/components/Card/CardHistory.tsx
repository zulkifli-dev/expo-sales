import formatRupiah from '@tools/formatRupiah';
import { HistoryOrderType } from '@type/order';
import moment from 'moment';
import { Text, TouchableOpacity, View } from 'react-native'
function CardHistory({ history }: { history: HistoryOrderType }) {

    return (
        <>
            <TouchableOpacity style={{ gap: 8 }} className='p-4 border-[1px] border-gray-300 my-1'>
                <View className='flex flex-row justify-between'>
                    <Text className='text-base flex-1'><Text className='font-bold text-primary'>#{history.id} - {history.attributes.outlet.data.attributes.nama}</Text></Text>
                    <View className=''>
                        <Text className='text-xs text-right'>Tanggal Order</Text>
                        <Text className='font-semibold text-sm text-right'>{moment(history.attributes.createdAt).format('DD-MM-YYYY')}</Text>
                    </View>
                </View>
                <View className='flex flex-row justify-between'>
                    <View>
                        <Text className='text-sm'>{history.attributes.outlet.data.attributes.kelurahan}, {history.attributes.outlet.data.attributes.kecamatan}</Text>
                        <Text>{history.attributes.outlet.data.attributes.alamat}</Text>
                    </View>
                    <Text className='font-semibold text-xl text-right text-primary'>{formatRupiah(history.attributes.total_gross)}</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default CardHistory