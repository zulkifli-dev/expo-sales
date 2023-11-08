import IconImage from '@components/IconImage'
import clsx from 'clsx'
import { ImageSourcePropType, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { twMerge } from 'tailwind-merge'



export interface ButtonProps extends Omit<TouchableOpacityProps, 'className'>, ClassNameComponentsProps {
    size?: 'small' | 'medium' | 'large',
    icon?: ImageSourcePropType
}
function Button(props: ButtonProps) {
    let styleSize = '';
    let styleSizeText = '';
    switch (props.size) {
        case 'small':
            styleSize = 'p-2';
            styleSizeText = 'text-lg';
            break;
        case 'medium':
            styleSize = 'p-3';
            styleSizeText = 'text-xl';
            break;
        case 'large':
            styleSize = 'p-4';
            styleSizeText = 'text-2xl';
            break;
        default:
            styleSize = 'p-3';
            styleSizeText = 'text-xl';

    }
    return (
        <TouchableOpacity className={twMerge(clsx('rounded flex items-center justify-center bg-primary flex-row', [styleSize, props.classNameContainer,]))} style={{ gap: 4 }} {...props}>
            {props.icon && <IconImage source={props.icon} />}
            <Text className={twMerge(clsx('text-white-0 text-center text-xl', [styleSizeText, props.classNameText,]))}>{props.children}</Text>
        </TouchableOpacity>

    )
}

export default Button