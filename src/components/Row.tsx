import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'


function Row(props: ViewProps) {
    return (
        <View
            {...props}
            style={[{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
            }, props?.style]}
        >
            {props.children}
        </View>
    )
}

export default Row