import Button from '@components/Button/Button'
import Header from '@components/Header'
import LabelValue from '@components/LabelValue'
import { ReactNode } from 'react'
import { Dimensions, ModalProps, Modal as ModalRN, Text, View } from 'react-native'

const { width } = Dimensions.get('screen')

export interface ModalCustomProps extends ModalProps {
    headerComponents?: ReactNode,
    modalTitle?: string,
    footerComponents?: ReactNode,
    classNameContainer?: string,
    classNameText?: string
}

function Modal(props: ModalCustomProps) {
    const { children, onRequestClose } = props
    return (
        <ModalRN {...props}>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className='flex justify-center items-center' >
                <View style={{ width: width * 0.9, gap: 16 }} className='bg-white-0 p-4 rounded-xl'>
                    {props.headerComponents || (
                        <Header classNameContainer='p-4' classNameText='text-2xl' title={props.modalTitle || 'Title'} />
                    )}

                    {children}

                    {props.footerComponents || (
                        <Button classNameContainer={props.classNameContainer} classNameText={props.classNameText} onPress={onRequestClose}>
                            Tutup
                        </Button>
                    )}
                </View>
            </View>
        </ModalRN>
    )
}

export default Modal