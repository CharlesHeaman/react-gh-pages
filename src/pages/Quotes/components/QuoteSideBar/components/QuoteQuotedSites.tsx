import { useState } from "react";
import SideBarButton from "../../../../../components/ui/Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../../../../../components/ui/Containers/SideBarModule/SideBarModule"
import AddQuotedSite from "./AddQuotedSite";

const QuoteQuotedSites = (props: {
    quoteID: number,
    customerID: number,
    getQuotedSites: (quoteID: number) => void
}) => {
    const [showAdd, setShowAdd] = useState(false);
    return (
        <>
            <SideBarModule title="Quoted Sites">
                <SideBarButton 
                    text="Add Quoted Site"
                    iconFont="add"
                    color="light-green"
                    clickEvent={() => setShowAdd(true)}
                />
            </SideBarModule>

            <AddQuotedSite
                quoteID={props.quoteID}
                customerID={props.customerID}
                getQuotedSite={props.getQuotedSites}
                show={showAdd}
                hideFunc={() => setShowAdd(false)}
            />

        </>
    )
}

export default QuoteQuotedSites