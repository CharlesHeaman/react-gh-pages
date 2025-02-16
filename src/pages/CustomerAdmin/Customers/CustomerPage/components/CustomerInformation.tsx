import { CustomerResponseData } from "../../../../../types/customers.types"
import InactiveStatus from "../../../../Vehicles/VehiclePage/components/InactiveStatus"
import CustomerAccountsInformation from "./CustomerAccountsInformation"
import CustomerDocuments from "./CustomerDocuments"
import CustomerInformationDetails from "./CustomerInformationDetails"
import CustomerLocationInformation from "./CustomerLocationInformation"
import CustomerTicketRequirements from "./CustomerTicketRequirements"

const CustomerInformation = (props: {
    customer: CustomerResponseData,
    lastDeactivate: Date | undefined,
    lastAccountsUpdate: Date | undefined,
}) => {
    return (
        <>
            {!props.customer.data.is_active ? <InactiveStatus resourceName='Customer' inactiveDate={props.lastDeactivate}/> : null}
            <CustomerInformationDetails
                customerData={props.customer.data}
            />
            <hr/>
            <CustomerLocationInformation 
                customerID={props.customer.id}
                customerData={props.customer.data}
            />
            <hr/>
            <CustomerAccountsInformation
                customerData={props.customer.data}
                lastAccountsUpdate={props.lastAccountsUpdate}
            />
            <hr/>
            <CustomerTicketRequirements
                customerData={props.customer.data}
            />
            <hr/>
            <CustomerDocuments
                customerID={props.customer.id}
            />
        </>
    )
}

export default CustomerInformation