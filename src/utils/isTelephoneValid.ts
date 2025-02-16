const isTelephoneValid = (telephone: string): boolean => {
    const telephoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return telephoneRegex.test(telephone);
}

export default isTelephoneValid