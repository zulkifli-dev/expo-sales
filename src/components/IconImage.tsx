import React from 'react'
import { ImageProps } from 'react-native'
import { Image } from 'react-native'

function IconImage(props: ImageProps) {
    return (
        <Image style={{ width: 24, height: 24, resizeMode: 'contain' }} {...props} />
    )
}

export default IconImage