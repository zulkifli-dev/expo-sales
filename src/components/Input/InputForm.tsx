import React from 'react'
import { useController } from 'react-hook-form'
import { TextInput, TextInputProps } from 'react-native'

function InputForm(props: TextInputProps & { control?: any, name?: string, defaultValue?: string }) {
    const { field } = useController({
        control: props.control,
        name: props.name ?? "",
        defaultValue: props.defaultValue ?? "",
    })
    return (
        <TextInput {...props} value={field.value} onChangeText={field.onChange} />
    )
}

export default InputForm