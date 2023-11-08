import clsx from 'clsx';
import { useState } from 'react';
import { Image, TextInput, TextInputProps, View } from 'react-native'




function SeachInput(props: TextInputProps & { containerClassName?: string }) {
    return (
        <View style={{ gap: 8 }} className={clsx('p-3 bg-white-0 flex flex-row items-center rounded-lg flex-1', props.containerClassName)}>
            <Image style={{ width: 30, height: 30 }} source={require('../assets/icons/iconSearch.png')} />
            <TextInput placeholder='Cari nama/nomor hp' className='text-sm' {...props} />
        </View>
    )
}

export default SeachInput