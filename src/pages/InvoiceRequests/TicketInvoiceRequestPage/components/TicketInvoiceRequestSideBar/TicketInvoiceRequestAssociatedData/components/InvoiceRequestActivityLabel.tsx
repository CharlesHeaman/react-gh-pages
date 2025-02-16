import Label from "../../../../../../../components/ui/General/Label/Label";

const InvoiceRequestActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Processed" iconFont="check_circle" color="dark-blue"/>;
            default:
                return <Label text="Create" iconFont="add" color="dark-blue"/>;
        }
    }

    return getLabel();
}
    
export default InvoiceRequestActivityLabel