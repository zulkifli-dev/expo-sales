import { View } from 'react-native'

function SafeAreaScroll({ height }: { height?: number }) {
    return (
        <View style={{ height: height || 80 }} />
    )
}

export default SafeAreaScroll