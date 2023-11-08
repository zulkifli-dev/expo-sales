import Button from '@components/Button/Button'
import { useCallback, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

function Counter({ minCounter = 0, maxCounter = 10 }: { maxCounter: number, minCounter?: number }) {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)

    const disabledDecrement = useCallback(() => {
        return count - 1 < minCounter
    }, [count])

    const disabledIncrement = useCallback(() => {
        return count + 1 > maxCounter
    }, [count])

    if (count === 0) {
        return (
            <Button size='small' classNameText='text-sm' onPress={increment}>Tambah</Button>
        )
    }

    return (
        <View style={{ gap: 12 }} className='flex flex-row items-center'>
            <TouchableOpacity onPress={decrement} disabled={disabledDecrement()} className={twMerge('bg-primary h-9 w-9 flex items-center justify-center rounded-full', disabledDecrement() && 'opacity-50')}><Text className='text-white-0 text-2xl'>-</Text></TouchableOpacity>
            <Text className='text-lg  text-center'>{count}</Text>
            <TouchableOpacity onPress={increment} disabled={disabledIncrement()} className={twMerge('bg-primary h-9 w-9 flex items-center justify-center rounded-full', disabledIncrement() && 'opacity-50')}><Text className='text-white-0 text-2xl'>+</Text></TouchableOpacity>
        </View>
    )
}

export default Counter