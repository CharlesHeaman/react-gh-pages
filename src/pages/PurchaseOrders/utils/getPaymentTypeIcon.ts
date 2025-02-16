
const getPaymentTypeIcon = (paymentType: number): string => {
    switch (paymentType) {
        case 3:
            return "receipt";
        case 2:
            return "account_balance_wallet";
        default:
            return "credit_card";
    }
}

export default getPaymentTypeIcon