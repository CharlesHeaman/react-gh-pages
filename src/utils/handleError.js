function handleError(error, addNotification, errorSetter) {
    if (error.status === 400) {
        if (error.data.errors[0].location === 'params') {
            return addNotification('Bad request', true);
        } 
        errorSetter && errorSetter(error.data.errors);
    }
    if (error.status === 500) {
        return addNotification('Server error', true);
    }
}

export default handleError