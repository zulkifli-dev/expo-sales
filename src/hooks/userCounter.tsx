import React, { useCallback, useState } from 'react'

export interface returnCounter {
    count: number,
    setCount: (value: number) => void
    increment: () => void,
    decrement: () => void,
    disabledDecrement: () => boolean,
    disabledIncrement: () => boolean
}

function userCounter(minCounter: number = 0, maxCounter: number = 10): returnCounter {
    const [count, setCount] = useState(0)

    const increment = () => setCount(count + 1)
    const decrement = () => setCount(count - 1)

    const disabledDecrement = useCallback(() => {
        return count - 1 < minCounter
    }, [count])

    const disabledIncrement = useCallback(() => {
        return count + 1 > maxCounter
    }, [count])

    return { count, setCount, increment, decrement, disabledDecrement, disabledIncrement }


}

export default userCounter