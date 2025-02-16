import { ChangeEvent } from "react"
import CheckboxInput from "../../../../../components/form/CheckboxInput/CheckboxInput"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateCustomerAttributes } from "../../../../../types/customers.types"

const CustomerTicketRequirementsForm = (props: {
    customerDetails: CreateCustomerAttributes,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    isEdit?: boolean,
}) => {

    return (
        <section>
            {props.isEdit && <h2>Ticket Requirements</h2>}
            <InfoGrid>
                <GridItem title='Ticket Always Require PO' span={3}>
                    <CheckboxInput
                        name="tickets_always_require_purchase_order"
                        checked={props.customerDetails.tickets_always_require_purchase_order}
                        updateFunc={props.updateCheckboxParams}
                        autoFocus={!props.isEdit}
                    />
                </GridItem>
                <GridItem title='Ticket Always Require RAMS' span={3}>
                    <CheckboxInput
                        name="tickets_always_require_rams"
                        checked={props.customerDetails.tickets_always_require_rams}
                        updateFunc={props.updateCheckboxParams}
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default CustomerTicketRequirementsForm