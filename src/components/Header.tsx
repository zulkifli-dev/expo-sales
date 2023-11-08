import { Text, TouchableOpacity, View } from 'react-native'
import IconImage from './IconImage'
import { useNavigation } from '@react-navigation/native'
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

function Header(props: { title: string, isButtonBack?: boolean } & ClassNameComponentsProps) {
    const navigation = useNavigation();
    return (
        <View className={twMerge('p-8 w-full bg-primary rounded-b-3xl', props.classNameContainer)}>
            {
                props.isButtonBack && <TouchableOpacity onPress={() => navigation.goBack()} className='absolute top-10 bottom-10 left-4 my-auto'><IconImage source={require('../assets/icons/iconBackWhite.png')} /></TouchableOpacity>
            }
            <Text className={twMerge('text-white-0 text-3xl font-semibold text-center', props.classNameText)}>{props.title}</Text>
        </View>
    )
}

export default Header