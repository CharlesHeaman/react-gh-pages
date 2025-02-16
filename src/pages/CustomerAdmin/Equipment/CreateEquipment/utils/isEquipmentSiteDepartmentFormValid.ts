const isEquipmentSiteDepartmentFormValid = (siteID: number | undefined, departmentID: number | undefined): boolean => {
   
    return (
        siteID !== undefined &&
        departmentID !== undefined
    )
   
}

export default isEquipmentSiteDepartmentFormValid