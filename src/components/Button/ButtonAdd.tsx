import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native"
import Modal, { ModalCustomProps } from "@components/Modal/Modal"
import { useState } from "react"
import Button from "./Button"

function ButtonAdd(props: ModalCustomProps & { visible: boolean, toggleModal: () => void }) {

    return (
        <>
            <Button onPress={props.toggleModal} icon={require('./../../assets/icons/iconPlusWhite.png')}>Outlet</Button>
            <Modal
                {...props}
                visible={props.visible}
                onRequestClose={props.toggleModal}
            >
                {props.children}
            </Modal>
        </>
    )
}

export default ButtonAdd