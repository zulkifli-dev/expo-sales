import React from 'react'

function IfElseComponent({ condition, children }: { condition: boolean, children: React.ReactNode[] }) {
    if (!condition) {
        return children[1]
    }
    return children[0]
}

export default IfElseComponent