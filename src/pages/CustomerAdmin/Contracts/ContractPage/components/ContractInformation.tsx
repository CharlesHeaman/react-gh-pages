import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import getExpiryStatus from "../../../../../components/ui/ExpiryDateLabel/getExpiryStatus"
import IconTitleText from "../../../../../components/ui/IconTitleText/IconTitleText"
import NewCustomerLink from "../../../../../components/ui/Links/NewCustomerLink"
import { Contract } from "../../../../../types/contract.types"
import { Customer } from "../../../../../types/customers.types"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { ScheduledMaintenanceVisitsResponseData } from "../../../../../types/scheduledMaintenanceVisits.types"
import formatDate from "../../../../../utils/formatDate"
import formatMoney from "../../../../../utils/formatMoney"
import InactiveStatus from "../../../../Vehicles/VehiclePage/components/InactiveStatus"
import InvoicePeriodLabel from "../../components/InvoicePeriodLabel"
import ContractInformationDetails from "./ContractInformationDetails"
import ContractScheduledVisits from "./ContractScheduledVisits"

const ContractInformation = (props: {
    customerData: Customer,
    contractData: Contract,
    department: DepartmentResponseData,
    scheduledVisits: Array<ScheduledMaintenanceVisitsResponseData>,
    scheduledVisitsPreviewDates?: Array<Date>,    
    isPreview?: boolean,
    lastDeactivate: Date | undefined
}) => {

    const expiryStatus = getExpiryStatus(props.contractData.end_at);
    const startStatus = getExpiryStatus(props.contractData.start_at, true);

    return (
        <>
            {!props.contractData.is_active ? <InactiveStatus resourceName='Contract' inactiveDate={props.lastDeactivate}/> : null}
            {expiryStatus === -1 &&
                <section>
                    <InnerContainer color="red">
                        <IconTitleText
                            title='Contract Invalid'
                            iconFont="event_busy"
                            text={`This contract expired on ${formatDate(props.contractData.end_at)}.`}
                            color="red"
                        />
                    </InnerContainer>
                </section>
            }
            {startStatus === -1 &&
                <section>
                    <InnerContainer color="red">
                        <IconTitleText
                            title='Contract Invalid'
                            iconFont="event_busy"
                            text={`This contract is invalid until ${formatDate(props.contractData.start_at)}.`}
                            color="red"
                        />
                    </InnerContainer>
                </section>
            }
            <ContractInformationDetails
                contractData={props.contractData}
                department={props.department}
                isPreview={props.isPreview}
            />
            <hr/>
            <section>
                <h2>Rates</h2>
                <InfoGrid>
                    <GridItem title='Engineer Rate' span={2}>
                        <p>{formatMoney(props.contractData.engineer_rate)}</p>
                    </GridItem>
                    <GridItem title='Mate Rate' span={2}>
                        <p>{formatMoney(props.contractData.mate_rate)}</p>
                    </GridItem>
                    <GridItem title='Mileage Rate' span={2}>
                        <p>{formatMoney(props.contractData.mileage_rate)}</p>
                    </GridItem>
                    <GridItem title='Material Markup' span={2}>
                        <p>{(props.contractData.material_markup)}%</p>
                    </GridItem>
                    <GridItem title='Sub-contract Markup' span={2}>
                        <p>{(props.contractData.subcontract_markup)}%</p>
                    </GridItem>
                    <GridItem title='Hire Markup' span={2}>
                        <p>{(props.contractData.hire_markup)}%</p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <section>
                <h2>Accounts Information</h2>
                <InfoGrid>
                    <GridItem title='Invoice Period' span={3}>
                        <p><InvoicePeriodLabel invoicePeriod={props.contractData.invoice_period}/></p>
                    </GridItem>
                    <GridItem title='Purchase Order Number' span={3}>
                        <p>{props.contractData.purchase_order_number ? props.contractData.purchase_order_number : 'None'}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
            <ContractScheduledVisits
                visitsPerYear={props.contractData.service_per_year}
                scheduledVisits={props.scheduledVisits}
                previewDates={props.scheduledVisitsPreviewDates}
                isPreview={props.isPreview}
            />
            {props.isPreview ? <>
                <hr/>
                <section>
                    <h2>Customer Information</h2>
                    <InfoGrid>
                        <GridItem title='Customer'>
                            <NewCustomerLink name={props.customerData.name} code={props.customerData.code}/>
                        </GridItem>
                    </InfoGrid>
                </section>
            </> : null}
        </>
    )
}

export default ContractInformation