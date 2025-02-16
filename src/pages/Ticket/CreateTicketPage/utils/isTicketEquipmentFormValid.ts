const isTicketEquipmentFormValid = (customerID: number | undefined, siteID: number | undefined, equipmentID: number | undefined, contactID: number | undefined): boolean => {
   
    return (
        customerID !== undefined && 
        siteID !== undefined && 
        equipmentID !== undefined && 
        contactID !== undefined 
    )
   
}

export default isTicketEquipmentFormValid