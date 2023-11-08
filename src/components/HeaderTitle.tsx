import { Text, View } from 'react-native'

function HeaderTitle({ title, description }: { title: string, description: string }) {
    return (
        <View className='justify-center flex-1'>
            <Text className='text-lg font-semibold'>{title}</Text>
            <Text className='text-base'>{description}</Text>
        </View>
    )
}

export default HeaderTitle