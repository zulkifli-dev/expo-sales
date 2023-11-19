import Button from '@components/Button/Button'
import Input from '@components/Input/Input'
import InputForm from '@components/Input/InputForm';
import React from 'react'
import { useController } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native'

function FormOutlet({ control }: any) {
    return (
        <View style={{ gap: 8 }} className='flex flex-col items-center p-4'>
            <InputForm control={control} name='nama' placeholder='Nama Outlet' className='border-[1px] rounded w-full p-2 border-primary items-center' />
            <InputForm control={control} name='type' placeholder='Type' className='border-[1px] rounded w-full p-2 border-primary items-center' />
            <InputForm control={control} name='alamat' placeholder='Alamat' className='border-[1px] rounded w-full p-2 border-primary items-center' />
            <InputForm control={control} name='kecamatan' placeholder='Kecamatan' className='border-[1px] rounded w-full p-2 border-primary items-center' />
            <InputForm control={control} name='kelurahan' placeholder='Kelurahan' className='border-[1px] rounded w-full p-2 border-primary items-center' />
            <InputForm control={control} name='target' placeholder='Target (Rp)' inputMode='numeric' className='border-[1px] rounded w-full p-2 border-primary items-center' />
            <InputForm control={control} name='status' placeholder='Status' className='border-[1px] rounded w-full p-2 border-primary items-center' />
        </View>
    )
}

export default FormOutlet