
import { ChangeEvent, useState } from "react"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import WindowOverlay from "../../../components/ui/Containers/WindowOverlay/WindowOverlay"
import { ContractResponseData } from "../../../types/contract.types"
import { CustomerResponseData } from "../../../types/customers.types"
import { DepartmentResponseData } from "../../../types/department.types"
import { EquipmentResponseData } from "../../../types/equipment.types"
import { InvoiceTicketTimeResponseData } from "../../../types/invoiceTicketTime.types"
import { InvoiceTypeResponseData } from "../../../types/invoiceTypes.types"
import { QuoteResponseData } from "../../../types/quote.types"
import { RequisitionLineResponseData } from "../../../types/requisitionLines.types"
import { SiteResponseData } from "../../../types/sites.types"
import { TicketResponseData } from "../../../types/tickets.types"
import { UserResponseData } from "../../../types/user.types"
import TicketInvoiceRequestTicketInformation from "../../InvoiceRequests/TicketInvoiceRequestPage/components/TicketInvoiceRequestTicketInformation"
import TicketAccountsDetails from "../components/TicketAccountsDetails"
import TicketHireCostBreakdown from "../TicketPage/components/TicketSideBar/components/TicketAccounts/components/TicketHireCostBreakdown"
import TicketLabourCostBreakdown from "../TicketPage/components/TicketSideBar/components/TicketAccounts/components/TicketLabourCostBreakdown"
import TicketMaterialCostBreakdown from "../TicketPage/components/TicketSideBar/components/TicketAccounts/components/TicketMaterialsCostBreakdown"
import TicketMileageCostBreakdown from "../TicketPage/components/TicketSideBar/components/TicketAccounts/components/TicketMileageCostBreakdown"
import TicketSubcontractCostBreakdown from "../TicketPage/components/TicketSideBar/components/TicketAccounts/components/TicketSubcontractCostBreakdown"
import TicketChargeBreakdown from "../TicketPage/components/TicketSideBar/components/TicketActions/components/TicketChargeBreakdown"
import { TicketCost } from "../utils/calculateTicketCost"
import getChargeRates from "../utils/getChargeRates"
import MoneyInput from "../../../components/form/MoneyInput/MoneyInput"
import { CreateTicketInvoiceRequestAttributes } from "../../../types/TicketInvoiceRequest.types"
import TextInput from "../../../components/form/TextInput/TextInput"
import CheckboxInput from "../../../components/form/CheckboxInput/CheckboxInput"
import TextareaInput from "../../../components/form/TextareaInput/TextareaInput"
import formatMoney from "../../../utils/formatMoney"
import GrossProfitMarginLabel from "../TicketPage/components/TicketSideBar/components/TicketActions/components/GrossProfitMarginLabel"
import getGrossProfitMargin from "../../../utils/getGrossProfit"
import BooleanLabel from "../../../components/ui/BooleanLabel/BooleanLabel"

const TicketInvoiceDetailsForm = (props: {
    ticket: TicketResponseData,
    department: DepartmentResponseData,
    customer: CustomerResponseData,
    site: SiteResponseData | undefined,
    equipment: EquipmentResponseData | undefined,
    contract: ContractResponseData | undefined,
    invoiceType: InvoiceTypeResponseData,
    quote: QuoteResponseData | undefined,
    ticketCost: TicketCost,
    users: Array<UserResponseData>,
    ticketInvoiceTime: Array<InvoiceTicketTimeResponseData>,
    requisitionLines: Array<RequisitionLineResponseData>,
    mileageCostRate: number,
    invoiceRequestDetails: CreateTicketInvoiceRequestAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    showErrors: boolean,
    isPreview?: boolean,
}) => {
    // Overlay States
    const [showLabour, setShowLabour] = useState(false);
    const [showMileage, setShowMileage] = useState(false);
    const [showMaterial, setShowMaterial] = useState(false);
    const [showSubcontract, setShowSubcontract] = useState(false);
    const [showHire, setShowHire] = useState(false);        


    const chargeRates = getChargeRates(props.invoiceType, props.department, props.contract);

    return (
        <>
            <TicketInvoiceRequestTicketInformation
                ticket={props.ticket}
                department={props.department}
                customer={props.customer}
                site={props.site}
                equipment={props.equipment}
            />
            <hr/>
            <TicketAccountsDetails 
                contract={props.contract} 
                invoiceType={props.invoiceType} 
                customer={props.customer} 
                purchaseOrderNumber={props.ticket.data.purchase_order_number} 
                isQuoted={props.ticket.data.parent_quote_id !== null}
            />
            <hr/>
            <TicketChargeBreakdown
                invoiceType={props.invoiceType}
                ticketCost={props.ticketCost}
                quote={props.quote}
                showLabourBreakdown={() => setShowLabour(true)}
                showMileageBreakdown={() => setShowMileage(true)}
                showMaterialBreakdown={() => setShowMaterial(true)}
                showSubcontractBreakdown={() => setShowSubcontract(true)}
                showHireBreakdown={() => setShowHire(true)}
            />
            <hr/>
            <section>
                <h2>Invoice Details</h2>
                <InfoGrid>
                    <GridItem title='Invoice Amount' span={2}>
                        {!props.isPreview ? 
                            <MoneyInput
                                name="requested_value"
                                label="Request value"
                                value={props.invoiceRequestDetails.requested_value}
                                updateFunc={props.updateParams}
                                hasSubmitted={props.showErrors}
                                autoFocus
                                isBig
                                required
                            /> : 
                            <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(props.invoiceRequestDetails.requested_value)}</span></p>
                        }
                    </GridItem>
                    <GridItem title='Total Cost' span={2}>
                        <p><span style={{ fontSize: '1.75em', fontWeight: '600'}}>{formatMoney(props.ticketCost.totalCost)}</span></p>
                    </GridItem>
                    <GridItem title='GP Markup' span={2}>
                        <GrossProfitMarginLabel grossProfitMargin={getGrossProfitMargin(props.ticketCost.totalCost, parseFloat(props.invoiceRequestDetails.requested_value))}/>
                    </GridItem>
                    <GridItem title='Purchase Order Number' secondaryTitle={!props.isPreview ? "(optional)" : undefined} span={2}>
                        {!props.isPreview ? 
                            <TextInput
                                name="purchase_order_number"
                                value={props.invoiceRequestDetails.purchase_order_number}
                                hasSubmitted={props.showErrors}
                                updateFunc={props.updateParams}
                                maxWidth={150}
                            /> :
                            <p>{props.invoiceRequestDetails.purchase_order_number.length > 0 ? props.invoiceRequestDetails.purchase_order_number : 'None'}</p>
                        }
                    </GridItem>
                    <GridItem title='Hold for Order Number' span={2}>
                        {!props.isPreview ? 
                            <CheckboxInput
                                name="holding_for_purchase_order_number"
                                checked={props.invoiceRequestDetails.holding_for_purchase_order_number}
                                updateFunc={props.updateCheckboxParams}
                            /> : 
                            <BooleanLabel true={props.invoiceRequestDetails.holding_for_purchase_order_number}/>
                        }
                    </GridItem>
                    <GridItem title='Invoice Text'>
                        {!props.isPreview ? 
                            <TextareaInput
                                name="invoice_text"
                                value={props.invoiceRequestDetails.invoice_text}
                                label="Invoice text"
                                hasSubmitted={props.showErrors}
                                updateFunc={props.updateParams}
                                required
                            /> :
                            <p>{props.invoiceRequestDetails.invoice_text}</p>
                        }
                    </GridItem>
                    <GridItem title='Accounts Notes' secondaryTitle={!props.isPreview ? "(optional)" : undefined}>
                        {!props.isPreview ? 
                            <TextareaInput
                                name="accounts_notes"
                                value={props.invoiceRequestDetails.accounts_notes}
                                updateFunc={props.updateParams}
                            /> :
                            <p>{props.invoiceRequestDetails.accounts_notes.length > 0 ? props.invoiceRequestDetails.accounts_notes : 'None'}</p>
                        }
                    </GridItem>
                </InfoGrid>
            </section>

            <WindowOverlay
                title="Labour Breakdown"
                show={showLabour}
                hideFunc={() => setShowLabour(false)}
                maxWidth={500}
            >
                <TicketLabourCostBreakdown 
                    users={props.users} 
                    engineerTime={props.ticketInvoiceTime}
                    engineerRate={chargeRates.engineerRate}
                    mateRate={chargeRates.mateRate}
                    showCharge={props.invoiceType.data.charge_labour}
                />
            </WindowOverlay>

            <WindowOverlay
                title="Mileage Breakdown"
                show={showMileage}
                hideFunc={() => setShowMileage(false)}
                maxWidth={300}
            >
                <TicketMileageCostBreakdown
                    mileageCostRate={props.mileageCostRate}
                    mileageChargeRate={chargeRates.mileageRate}
                    engineerTime={props.ticketInvoiceTime}
                    showCharge={props.invoiceType.data.charge_mileage}
                />
            </WindowOverlay>

            <WindowOverlay
                title="Material Breakdown"
                show={showMaterial}
                hideFunc={() => setShowMaterial(false)}
                maxWidth={1100}
            >
                <TicketMaterialCostBreakdown
                    materialLines={props.requisitionLines.filter(requisitionLine => requisitionLine.data.item_type === 0)}
                    materialMarkup={chargeRates.materialMarkup}
                    showCharge={props.invoiceType.data.charge_materials}
                />
            </WindowOverlay>

            <WindowOverlay
                title="Subcontract Breakdown"
                show={showSubcontract}
                hideFunc={() => setShowSubcontract(false)}
                maxWidth={1100}
            >
                <TicketSubcontractCostBreakdown
                    subcontractLines={props.requisitionLines.filter(requisitionLine => requisitionLine.data.item_type === 1)}
                    subcontractMarkup={chargeRates.subcontractMarkup}
                    showCharge={props.invoiceType.data.charge_subcontract}
                />
            </WindowOverlay>

            <WindowOverlay
                title="Hire Breakdown"
                show={showHire}
                hideFunc={() => setShowHire(false)}
                maxWidth={1100}
            >
                <TicketHireCostBreakdown
                    hireLines={props.requisitionLines.filter(requisitionLine => requisitionLine.data.item_type === 2)}
                    hireMarkup={chargeRates.hireMarkup}
                    showCharge={props.invoiceType.data.charge_hire}
                />
            </WindowOverlay>
        </>
    )
}

export default TicketInvoiceDetailsForm