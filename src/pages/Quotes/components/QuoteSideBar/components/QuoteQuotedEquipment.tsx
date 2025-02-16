import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import AddQuotedEquipment from "./AddQuotedEquipment";

const QuoteQuotedEquipment = (props: {
    quoteID: number,
    siteID: number,
    getQuotedEquipment: (quoteID: number) => void
}) => {
    const [showAdd, setShowAdd] = useState(false);
    return (
        <>
            <SideBarModule title="Quoted Equipment">
                <SideBarButton 
                    text="Add Equipment Quote"
                    iconFont="add"
                    color="light-green"
                    clickEvent={() => setShowAdd(true)}
                />
            </SideBarModule>

            <AddQuotedEquipment
                quoteID={props.quoteID}
                siteID={props.siteID}
                getQuotedEquipment={props.getQuotedEquipment}
                show={showAdd}
                hideFunc={() => setShowAdd(false)}
            />

        </>
    )
}

export default QuoteQuotedEquipment