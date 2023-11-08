import React from 'react'
import { Text, View } from 'react-native'
import { twMerge } from 'tailwind-merge'


interface LabelValueProps {
    label: string,
    value: string | number,
    classNameLabel?: string,
    classNameValue?: string,
    classNameContainer?: string
}
function LabelValue(props: LabelValueProps) {
    return (

        <View className={twMerge('flex flex-row', props.classNameContainer)}>
            <Text className={twMerge('text-base font-light', props.classNameLabel)}>{props.label}</Text>
            <Text className={twMerge('font-semibold text-right flex-1 text-base', props.classNameValue)}>{props.value}</Text>
        </View>
    )
}

export default LabelValue