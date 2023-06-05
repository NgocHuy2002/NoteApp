
export const Compare = (note, keyword) =>{
    return(
        note.trim()
        .toLowerCase()
        .includes(keyword.trim().toLowerCase())
    )
}