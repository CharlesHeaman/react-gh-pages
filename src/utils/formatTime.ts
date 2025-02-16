const formatTime = (date: Date, showSeconds?: boolean) => {
    return new Date(date).toLocaleTimeString([], {
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: showSeconds ? '2-digit' : undefined
    })
}

export default formatTime