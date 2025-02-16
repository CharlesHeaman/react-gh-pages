
const getPaymentTypeTitle = (paymentType: number): string => {
    switch (paymentType) {
        case 3:
            return "Pro Forma";
        case 2:
            return "On Account";
        default:
            return "Credit Card";
    }
}

export default getPaymentTypeTitle