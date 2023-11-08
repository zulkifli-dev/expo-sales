import { Image, Text, TouchableOpacity, View } from 'react-native'
import Button from './Button'
import { useState } from 'react'

function MoreButton() {
    const [isOpen, setIsOpen] = useState(false)

    if (isOpen) {
        return (
            <View style={{ gap: 8, elevation: 4 }} className='flex flex-col items-start bg-white-0 p-2 rounded-md absolute right-0'>
                <TouchableOpacity style={{ gap: 4 }} onPress={() => setIsOpen(false)} className='flex flex-row items-center bg-red-200 px-2 py-1 rounded w-full'>
                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/iconTrash.png')} />
                    <Text className='text-red-600 font-semibold'>Hapus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ gap: 4 }} onPress={() => setIsOpen(false)} className='flex flex-row items-center bg-blue-200 px-2 py-1 rounded w-full'>
                    <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/iconPencil.png')} />
                    <Text className='text-blue-600 font-semibold'>Edit</Text>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <TouchableOpacity onPress={() => setIsOpen(true)}>
            <Image style={{ width: 25, height: 25 }} source={require('../../assets/icons/iconMore.png')} />
        </TouchableOpacity>
    )
}

export default MoreButton