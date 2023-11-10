import Button from '@components/Button/Button'
import { returnCounter } from '@hooks/userCounter'
import { useCallback, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

function Counter({ count, decrement, increment, disabledDecrement, disabledIncrement, }: returnCounter) {


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