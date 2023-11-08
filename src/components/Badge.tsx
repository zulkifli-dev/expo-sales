import clsx from 'clsx';
import { ReactNode } from 'react'
import { Text, TouchableOpacity } from 'react-native'



function Badge({ children, type }: { children: ReactNode, type: any }) {
    let containerStyle = '';
    let textStyle = '';
    switch (type) {
        default:
            containerStyle = 'bg-primary';
            textStyle = 'text-white-0'
    }
    return (
        <TouchableOpacity className={clsx('rounded-full px-3 py-1', containerStyle)}>
            <Text className={clsx('text-xs font-semibold', textStyle)}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Badge