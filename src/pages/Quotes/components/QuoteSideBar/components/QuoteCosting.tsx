import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import EditQuoteRates from "./EditQuoteRates";
import { QuotedEquipmentResponseData } from "../../../../../types/quotedEquipment.types";

const QuoteCosting = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    getQuotedEquipment: () => void,
}) => {
    const [showEdit, setShowEdit] = useState(false);
    
    return (
        <>
            <SideBarModule title="Costing">
                <SideBarButton 
                    text='Edit Quote Rates' 
                    iconFont="currency_pound"
                    clickEvent={() => setShowEdit(true)}
                />
            </SideBarModule>

            <EditQuoteRates 
                quotedEquipment={props.quotedEquipment}
                getQuotedEquipment={props.getQuotedEquipment}
                show={showEdit} 
                hideFunc={() => setShowEdit(false)}
            />
        </>
    )
}

export default QuoteCosting