const EquipmentLink = (props: {
    code: string,
    customerID: number,
    siteID: number,
    equipmentID: number
}) => {
    return (
        <a href={`${process.env.REACT_APP_OLD_SITE_URL}/equipadmin.asp?a=editequipment&cid=${props.customerID}&siteid=${props.siteID}&equipid=${props.equipmentID}`}>{props.code}</a>
    )
}

export default EquipmentLink