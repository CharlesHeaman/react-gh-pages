import { ContractResponseData } from "../../../../../types/contract.types"
import { CustomerResponseData } from "../../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { ScheduledMaintenanceVisitsResponseData } from "../../../../../types/scheduledMaintenanceVisits.types"
import { SiteResponseData } from "../../../../../types/sites.types"
import InactiveStatus from "../../../../Vehicles/VehiclePage/components/InactiveStatus"
import ContractScheduledVisits from "../../../Contracts/ContractPage/components/ContractScheduledVisits"
import SiteInformationDetails from "./SiteInformationDetails"
import SiteLocationInformation from "./SiteLocationInformation"

const SiteInformation = (props: {
    customer: CustomerResponseData,
    site: SiteResponseData,
    department: DepartmentResponseData,
    contract: ContractResponseData | undefined,
    scheduledVisits: Array<ScheduledMaintenanceVisitsResponseData>,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.site.data.is_active ? <InactiveStatus resourceName='Site' inactiveDate={props.lastDeactivate}/> : null}
            <SiteInformationDetails
                siteData={props.site.data}
                department={props.department}
            />
            <hr/>
            <SiteLocationInformation
                siteData={props.site.data}
            />
            {/* <hr/> */}
            {/* <SiteCustomerInformation
                customer={props.customer}
                contract={props.contract}
            /> */}
            {props.contract ? <>
                <hr/>
                <ContractScheduledVisits
                    contractReferenceNumber={props.contract.data.reference_number}
                    visitsPerYear={props.contract.data.service_per_year}
                    scheduledVisits={props.scheduledVisits}
                />
            </> : null}                
        </>
    )
}

export default SiteInformation