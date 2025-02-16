import CustomerLink from "../../../../../components/ui/Links/CustomerLink"
import NewCustomerLink from "../../../../../components/ui/Links/NewCustomerLink"
import SupplierManufacturerLink from "../../../../../components/ui/Links/SupplierManufacturerLink"
import { CustomerResponseData } from "../../../../../types/customers.types"
import { NonConformanceReportResponseData } from "../../../../../types/nonConformanceReport.types"
import { SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types"
import formatDate from "../../../../../utils/formatDate"
import NonConformanceReportLink from "../../components/NonConformanceReportLink"
import NonConformanceReportStatusLabel from "../../components/NonConformanceReportStatusLabel"
import NonConformanceReportTypeLabel from "../../components/NonConformanceReportTypeLabel"

const NonConformanceReportRow = (props: {
    nonConformanceReport: NonConformanceReportResponseData,    
    customer: CustomerResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined
}) => {
    return (
        <tr>
            <td className="text-left">
                <div className="flex">
                    <NonConformanceReportLink 
                        nonConformanceReportID={props.nonConformanceReport.id} 
                    />
                </div>
            </td>
            <td className="text-left">{
                props.nonConformanceReport.data.type === 1 && props.customer ?
                    <NewCustomerLink 
                        name={props.customer.data.name} 
                        code={props.customer.data.code}
                    /> :
                    props.nonConformanceReport.data.type === 3 && props.supplier ?
                        <SupplierManufacturerLink 
                            code={props.supplier.data.code} 
                            name={props.supplier.data.name}
                        />
                        : props.nonConformanceReport.data.source
            }</td>
            <td>
                <NonConformanceReportTypeLabel type={props.nonConformanceReport.data.type} hideText/>
            </td>
            <td className="text-left">
                <div
                    style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        display: 'block',
                        textOverflow: 'ellipsis',
                        maxWidth: '800px'
                    }}
                >
                    {props.nonConformanceReport.data.cause}
                </div>
            </td>
            <td>{formatDate(props.nonConformanceReport.data.created_at)}</td>
            <td><NonConformanceReportStatusLabel isProcessed={props.nonConformanceReport.data.is_closed} hideText/></td>
        </tr>
    )
}

export default NonConformanceReportRow