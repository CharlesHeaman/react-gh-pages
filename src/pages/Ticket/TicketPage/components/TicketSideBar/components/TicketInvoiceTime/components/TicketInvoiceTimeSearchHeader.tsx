import SearchForm from "../../../../../../../../components/form/SearchForm/SearchForm";
import ShowCreateButton from "../../../../../../../../components/form/ShowCreateButton/ShowCreateButton";
import PermsProtectedComponent from "../../../../../../../../components/PermsProtectedComponent";
import HeaderFlex from "../../../../../../../../components/ui/HeaderFlex";

const TicketInvoiceTimeSearchHeader = (props: {
    showAdd: () => void,
}) => {
    return (
        <HeaderFlex>
            <SearchForm
                placeHolder="Search time by users..."
                prefix="invoice_ticket_time"
            />
            <PermsProtectedComponent requiredPerms={{ engineer_data: 2 }}>
                <ShowCreateButton
                    text={"Add Ticket Time"} 
                    clickFunc={props.showAdd}                
                />
            </PermsProtectedComponent>

        </HeaderFlex>
    )
}

export default TicketInvoiceTimeSearchHeader