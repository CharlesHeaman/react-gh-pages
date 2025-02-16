import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import Label from "../../../../components/ui/General/Label/Label"
import RefrigerantLink from "../../../../components/ui/Links/RefrigerantLink"
import SupplierManufacturerLink from "../../../../components/ui/Links/SupplierManufacturerLink"
import UserLink from "../../../../components/ui/Links/UserLink"
import { GasBottleResponseData } from "../../../../types/gasBottle.types"
import { RefrigerantResponseData } from "../../../../types/refrigerant.types"
import { SupplierManufacturerResponseData } from "../../../../types/supplierManufacturer.types"
import { UserResponseData } from "../../../../types/user.types"
import formatWeight from "../../../../utils/formatWeight"
import RefrigerantMovementLabel from "../../../RefrigerantMovements/components/RefrigerantMovementLabel"
import GasBottleLink from "../../components/GasBottleLink"
import GasBottleStatusLabel from "../../components/GasBottleStatusLabel"

const GasBottleRow = (props: {
    gasBottle: GasBottleResponseData,
    refrigerant: RefrigerantResponseData | undefined,
    user: UserResponseData | undefined,
    supplier: SupplierManufacturerResponseData | undefined,
    hideRefrigerant?: boolean,
    hideAssignedTo?: boolean,
    hideSupplier?: boolean,
    hideStatus?: boolean,
    isConsumable?: boolean,
    isReturn?: boolean,
}) => {
    return (
        <tr>
            <td className="text-left"><GasBottleLink code={props.gasBottle.data.code} isConsumable={props.isConsumable}/></td>
            <td className="text-left">{props.gasBottle.data.number}</td>
            {!props.isConsumable ? <td><RefrigerantMovementLabel 
                isDecant={props.gasBottle.data.is_decant}
                hideText
            /></td> : null}
            {!props.hideRefrigerant ? 
                <td className="text-left">{props.refrigerant ? <RefrigerantLink refrigerantID={props.refrigerant.id} name={props.refrigerant.data.name}/> : null}</td> 
                : null
            }
            {!props.hideSupplier ? 
                <td className="text-left">{props.supplier ? <SupplierManufacturerLink code={props.supplier.data.code} name={props.supplier.data.name}/> : null}</td>
                : null
            }
            {!props.isConsumable ? <td className="text-right">{formatWeight(props.gasBottle.data.current_gas_weight)} kg</td> : null}
            <td>{props.gasBottle.data.received_date ? <ExpiryDateLabel date={props.gasBottle.data.rental_end_date}/> : 'None'}</td>
            {!props.hideAssignedTo && !props.isReturn ? 
                <td className="text-left">{
                    props.gasBottle.data.supplier_returned_by_id === null ?
                        props.user ? 
                            <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> : 
                            'Unassigned'
                        : 
                        <Label text="N/A" color="grey"/>
                }</td>
                : null
            }
            {!props.hideStatus && !props.isReturn ? <td><GasBottleStatusLabel 
                isAssigned={props.gasBottle.data.assigned_to_id !== null} 
                isReturned={props.gasBottle.data.supplier_returned_by_id !== null}
                isQueued={props.gasBottle.data.is_queued}
            /></td> : null}
        </tr>
    )
}

export default GasBottleRow