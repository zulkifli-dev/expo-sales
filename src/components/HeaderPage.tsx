import clsx from 'clsx'
import { ReactNode } from 'react'
import { Text } from 'react-native'

function HeaderPage({ children, center }: { children: ReactNode, center?: boolean }) {
    if (center) {
        return (
            <Text className={clsx('text-2xl font-bold w-full text-center')}>{children}</Text>
        )
    }
    return (
        <Text className={clsx('text-2xl font-bold w-full')}>{children}</Text>
    )
}

export default HeaderPage