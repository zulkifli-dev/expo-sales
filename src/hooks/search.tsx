import React, { useState } from 'react'

function useSearch() {
    const [search, setSearch] = useState('')

    function handleSearch(text: string) {
        setSearch(text)
    }

    return {
        search,
        handleSearch
    }
}

export default useSearch