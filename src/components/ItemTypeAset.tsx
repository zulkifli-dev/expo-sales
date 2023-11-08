import clsx from 'clsx'
import { ImageSourcePropType } from 'react-native'
import { Image, Text, TouchableOpacity } from 'react-native'

function ItemTypeAset({ source, title, selected, onPress }: { source: ImageSourcePropType, title: string, selected: boolean, onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} className={clsx('flex items-center flex-1  border-[1px]  rounded-xl p-3', selected ? 'border-gray-800' : 'border-gray-300')}>
            <Image style={{ width: 30, height: 30 }} source={source} />
            <Text className='text-xs'>{title}</Text>
        </TouchableOpacity>
    )
}

export default ItemTypeAset