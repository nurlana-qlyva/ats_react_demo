export const formatDate = (date) => {
    const d = new Date(date)
    let month = d.getMonth() + 1
    let day = d.getDate()
    if (month < 10) month = "0" + month
    if (day < 10) day = "0" + day
    const format = d.getFullYear() + "-" + month + "-" + day
    
    return format
}
