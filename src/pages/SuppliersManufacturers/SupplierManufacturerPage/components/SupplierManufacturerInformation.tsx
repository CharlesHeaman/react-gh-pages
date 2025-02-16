import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import UserLink from "../../../../components/ui/Links/UserLink"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDate from "../../../../utils/formatDate"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import getISOApprovalColor from "../../utils/getISOApprovalColor"
import getISOApprovalIcon from "../../utils/getISOApprovalIcon"
import getISOApprovalText from "../../utils/getISOApprovalText"
import SupplierManufacturerAccountsInformation from "./SupplierManufacturerAccountsInformation"
import SupplierManufacturerContactInformation from "./SupplierManufacturerContactInformation"
import SupplierManufacturerDocuments from "./SupplierManufacturerDocuments"
import SupplierManufacturerInformationDetails from "./SupplierManufacturerInformationDetails"

const SupplierManufacturerInformation = (props: {
    supplierManufacturer: SupplierManufacturerResponseData,
    user: UserResponseData | undefined,
    lastDeactivate: Date | undefined
}) => {    
    return (
        <>
            {!props.supplierManufacturer.data.is_active ? <InactiveStatus resourceName='Plant/Tools' inactiveDate={props.lastDeactivate}/> : null}
            <section>
                <InnerContainer color={getISOApprovalColor(props.supplierManufacturer.data.is_approved)}>
                    <IconTitleText
                        iconFont={getISOApprovalIcon(props.supplierManufacturer.data.is_approved)}
                        color={getISOApprovalColor(props.supplierManufacturer.data.is_approved)}
                        title={getISOApprovalText(props.supplierManufacturer.data.is_approved)}
                        text={props.supplierManufacturer.data.is_approved !== null ?
                            props.supplierManufacturer.data.is_approved ? 
                                <>
                                    This supplier/manufacturer was approved by {props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'unknown'} on {props.supplierManufacturer.data.approval_updated_at ? formatDate(props.supplierManufacturer.data.approval_updated_at) : 'unknown'}.
                                </> :
                                <>
                                    This supplier/manufacturer was not approved by {props.user ? <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 'unknown'} on {props.supplierManufacturer.data.approval_updated_at ? formatDate(props.supplierManufacturer.data.approval_updated_at) : 'unknown'}.
                                </>
                            : 
                            "This supplier/manufacturer is still pending approval."
                        }
                    />
                </InnerContainer> 
            </section>
            <SupplierManufacturerInformationDetails
                supplierManufacturerData={props.supplierManufacturer.data}
            />
            <hr/>
            <SupplierManufacturerContactInformation
                supplierManufacturerData={props.supplierManufacturer.data}
            />
            <hr/>
            <SupplierManufacturerAccountsInformation
                supplierManufacturerData={props.supplierManufacturer.data}
            />            
            <hr/>
            <SupplierManufacturerDocuments 
                supplierID={props.supplierManufacturer.id}
            />
        </>
    )
}

export default SupplierManufacturerInformation