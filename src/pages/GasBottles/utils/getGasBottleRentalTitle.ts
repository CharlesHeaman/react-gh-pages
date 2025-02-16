const getGasBottleRentalTitle = (rentalStatus: number) => {
    switch (rentalStatus) {
        case -1:
            return 'Rental Expired'
        case 0:
            return 'Rental Expiring Soon'
        default:
            return 'Rental Good'
    }
}

export default getGasBottleRentalTitle