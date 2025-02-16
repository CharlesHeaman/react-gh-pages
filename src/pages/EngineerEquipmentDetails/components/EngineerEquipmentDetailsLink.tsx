import getEngineerEquipmentDetailsURL from "../utils/getEngineerEquipmentDetailsURL"

const EngineerEquipmentDetailsLink = (props: {
    engineerEquipmentDetailsID: number,
    departmentName: string | undefined
}) => {
    return (
        <a 
            href={getEngineerEquipmentDetailsURL(props.engineerEquipmentDetailsID, props.departmentName)}
            className='icon-link'
        >
            <span className="material-icons">list_alt</span>
            <span>{props.engineerEquipmentDetailsID}</span>
        </a>
    )
}

export default EngineerEquipmentDetailsLink