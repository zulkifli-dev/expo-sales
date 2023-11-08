import clsx from 'clsx';
import { ReactNode } from 'react';
import { UseControllerProps, useController } from 'react-hook-form'
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { TextInput, TextInputProps } from 'react-native'
import { twMerge } from 'tailwind-merge';

interface IUseHooksFormProps {
    isUseHooksForm?: boolean,
    control?: UseControllerProps['control'],
    name?: string,
    defaultValue?: string
}

function Input(props: { icon?: ImageSourcePropType, classNameContainer?: string } & TextInputProps & IUseHooksFormProps) {

    if (props?.isUseHooksForm) {
        const { field } = useController({
            control: props.control,
            name: props.name ?? "",
            defaultValue: props.defaultValue ?? "",
        });

        return (
            <View style={{ gap: 8 }} className={twMerge(clsx('flex flex-row border-[1px] rounded flex-1 p-2 border-primary items-center', props.classNameContainer))}>
                {props.icon && <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={props.icon} />}
                <TextInput {...props} placeholderTextColor={'#2089AB'} className='text-lg flex-1' value={field.value} onChangeText={field.onChange} />
            </View>
        );
    }

    return (
        <View style={{ gap: 8 }} className={twMerge(clsx('flex flex-row border-[1px] rounded flex-1 p-2 border-primary items-center', props.classNameContainer))}>
            {props.icon && <Image style={{ width: 30, height: 30, resizeMode: 'contain' }} source={props.icon} />}
            <TextInput {...props} placeholderTextColor={'#2089AB'} className='text-lg flex-1' />
        </View>
    );
}

export default Input