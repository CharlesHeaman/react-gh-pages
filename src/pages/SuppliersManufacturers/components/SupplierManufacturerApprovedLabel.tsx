import Label from "../../../components/ui/General/Label/Label";

const SupplierManufacturerApprovedLabel = (props: {
    is_approved: boolean | null,
    hideIcon?: boolean,
    hideText?: boolean,
}) => {
    const getLabel = () => {
        switch (props.is_approved) {
            case true:
                return <Label text="Approved" color="light-green" iconFont='done' hideIcon={props.hideIcon} hideText={props.hideText}/>
            case false:
                return <Label text="Non-approved" color="red" iconFont='close' hideIcon={props.hideIcon} hideText={props.hideText}/>
            default:
                return <Label text="Pending" color="light-blue" iconFont="pending" hideIcon={props.hideIcon} hideText={props.hideText}/>
        }
    }
    return getLabel()
}

export default SupplierManufacturerApprovedLabel