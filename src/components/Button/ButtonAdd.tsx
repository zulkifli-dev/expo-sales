import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native"
import Modal, { ModalCustomProps } from "@components/Modal/Modal"
import { useState } from "react"

function ButtonAdd(props: ModalCustomProps & { visible: boolean, toggleModal: () => void }) {

    return (
        <>
            <TouchableOpacity
                {...props}
                onPress={props.toggleModal}
                className="bg-red-500 p-2 rounded"
            >
                <Image
                    style={{ width: 25, height: 25 }}
                    source={require('../../assets/icons/iconAdd.png')}
                />
            </TouchableOpacity>
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