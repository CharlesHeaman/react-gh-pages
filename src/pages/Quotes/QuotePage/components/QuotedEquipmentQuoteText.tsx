import { useState } from "react";
import SideBarButton from "../../../../components/ui/Buttons/SideBarButton/SideBarButton";
import SideBarModule from "../../../../components/ui/Containers/SideBarModule/SideBarModule";
import EditQuotedEquipmentQuoteText from "./EditQuotedEquipmentQuoteText";
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types";

const QuotedEquipmentQuoteText = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    getQuotedEquipment: () => void,
}) => {
    const [showText, setShowText] = useState(false);

    return (
        <>
            <SideBarModule title='Quote Text'>
                <SideBarButton
                    text='Edit Quote Text'
                    iconFont="description"
                    color="orange"
                    clickEvent={() => setShowText(true)}
                />
            </SideBarModule>

            <EditQuotedEquipmentQuoteText
                quotedEquipmentID={props.quotedEquipment.id}
                quoteText={props.quotedEquipment.data.quote_text}
                getQuotedEquipment={props.getQuotedEquipment}
                show={showText}
                hideFunc={() => setShowText(false)}
            />
        </>
    )
}

export default QuotedEquipmentQuoteText