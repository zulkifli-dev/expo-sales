import Button from '@components/Button/Button'
import Header from '@components/Header'
import LabelValue from '@components/LabelValue'
import { ReactNode } from 'react'
import { Dimensions, ModalProps, Modal as ModalRN, Text, View } from 'react-native'

const { width, height } = Dimensions.get('screen')

export interface ModalCustomProps extends ModalProps {
    headerComponents?: ReactNode,
    modalTitle?: string,
    footerComponents?: ReactNode,
    classNameContainer?: string,
    classNameText?: string
}

function ModalBottom(props: ModalCustomProps) {
    const { children, onRequestClose } = props
    if (props.visible) {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className='flex justify-end items-center absolute z-50' >
                <ModalRN {...props} animationType='slide' transparent>
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0)' }} className='flex justify-end items-center' >
                        <View style={{ width: width, gap: 16, maxHeight: height * 0.8 }} className='bg-white-0 rounded-t-2xl overflow-hidden'>
                            {props.headerComponents || (
                                <Header classNameContainer='p-4' classNameText='text-2xl' title={props.modalTitle ?? "Modal Title"} />
                            )}
                            <View style={{ gap: 16 }} className='p-4'>
                                {children}
                                {props.footerComponents || (
                                    <Button classNameContainer={props.classNameContainer} classNameText={props.classNameText} onPress={onRequestClose}>
                                        Tutup
                                    </Button>
                                )}
                            </View>
                        </View>
                    </View>
                </ModalRN>
            </View>
        )
    }
}

export default ModalBottom