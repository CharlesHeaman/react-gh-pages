import Label from "../../../../components/ui/General/Label/Label"
import getCustomerAccountsStatusColor from "../utils/getCustomerAccountsStatusColour"
import getCustomerAccountsStatusIcon from "../utils/getCustomerAccountsStatusIcon"
import getCustomerAccountsStatusTitle from "../utils/getCustomerAccountsStatusText"

const CustomerAccountStatusLabel = (props: {
    accountsStatus: number,
    noBackground?: boolean
}) => {

    return <Label 
        text={getCustomerAccountsStatusTitle(props.accountsStatus)}
        color={getCustomerAccountsStatusColor(props.accountsStatus)}
        iconFont={getCustomerAccountsStatusIcon(props.accountsStatus)}
        noBackground={props.noBackground}
        hideText={props.noBackground}
    />
}

export default CustomerAccountStatusLabel