import formatDate from "../../utils/formatDate"
import InnerContainer from "../ui/Containers/InnerContainer/InnerContainer"
import PurchaseOrderLink from "../ui/Links/PurchaseOrderLink"
import RequisitionLink from "../ui/Links/RequisitionLink"

const Requisition = (props) => {
    return (
        props.req.lines.length > 0 ?
            <InnerContainer 
                title={<RequisitionLink number={props.req.number}/>} 
                headerItem={
                    <div className="flex">
                        <h4 className="text-left no-wrap">{props.req.originator.fullName}</h4>
                        <h4 className="text-left no-wrap">{formatDate(props.req.createdDate)}</h4>
                    </div>
                }
                collapsible
            >
                <table>
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Desc</th>
                            {props.req.lines.filter(line => line.purchaseOrderNumber !== null).length > 0 && <th>Purchase Order</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {props.req.lines.map((line, index) => 
                            <tr key={index}>
                                <td>{line.quantity}</td>
                                <td>{line.unit}</td>
                                <td className="text-left">{line.desc}</td>
                                {props.req.lines.filter(line => line.purchaseOrderNumber !== null).length > 0 && 
                                    <td>{line.purchaseOrderNumber && <PurchaseOrderLink number={line.purchaseOrderNumber}/>}</td>
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </InnerContainer> :
            null
    )
}

export default Requisition