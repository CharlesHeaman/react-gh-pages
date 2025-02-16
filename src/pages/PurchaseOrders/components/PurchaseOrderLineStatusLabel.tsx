import { ReactNode } from "react";
import Label from "../../../components/ui/General/Label/Label";

const PurchaseOrderLineStatusLabel = (props: {
    status: number,
}) => {
    const getLabel = () => {
        switch (props.status) {
            case 1:
                return <Label iconFont="done" color="dark-blue"/>;
            case 2:
                return <Label iconFont="close" color="red"/>;        
            default:
                return <Label iconFont="pending" color="light-blue"/>;
        }
    }
    return getLabel()
}

export default PurchaseOrderLineStatusLabel