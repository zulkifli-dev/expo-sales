import React from 'react'

function IfComponent({ condition, children }: { condition: boolean, children: React.ReactNode }) {
    if (!condition) {
        return null
    }
    return children
}

export default IfComponent