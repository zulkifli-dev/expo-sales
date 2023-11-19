import clsx from 'clsx';
import { ReactNode } from 'react'
import { Text, TouchableOpacity } from 'react-native'



function Badge({ children, containerClassname, textClassname }: { children: ReactNode, containerClassname?: string, textClassname?: string }) {
    return (
        <TouchableOpacity className={clsx('rounded-full px-3 py-1', containerClassname)}>
            <Text className={clsx('text-xs text-white-0', textClassname)}>{children}</Text>
        </TouchableOpacity>
    )
}

export default Badge