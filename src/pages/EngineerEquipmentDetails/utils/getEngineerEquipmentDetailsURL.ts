const getEngineerEquipmentDetailsURL = (engineerEquipmentDetailsID: number, departmentName: string | undefined) => {
    return `/#/${departmentName ? `${departmentName}/` : ''}engineer_equipment_details/${engineerEquipmentDetailsID}`
}

export default getEngineerEquipmentDetailsURL