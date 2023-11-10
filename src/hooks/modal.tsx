import React from 'react'

function useModal() {
    const [visible, setVisible] = React.useState(false)
    function toggleModal() {
        setVisible(!visible)
    }

    return { visible, setVisible, toggleModal }
}

export default useModal