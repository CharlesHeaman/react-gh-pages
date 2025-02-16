
import { ProductResponseData } from "../../../../types/products.types"
import { RefrigerantResponseData } from "../../../../types/refrigerant.types"
import InactiveStatus from "../../../Vehicles/VehiclePage/components/InactiveStatus"
import RefrigerantInformationDetails from "./RefrigerantInformtionDetails"
import RefrigerantStockInformation from "./RefrigerantStockInformation"

const RefrigerantInformation = (props: {
    refrigerant: RefrigerantResponseData,
    product: ProductResponseData | undefined,
    lastDeactivate: Date | undefined
}) => {
    return (
        <>
            {!props.refrigerant.data.is_active ? <InactiveStatus resourceName='Refrigerant' inactiveDate={props.lastDeactivate}/> : null}
            <RefrigerantInformationDetails refrigerantData={props.refrigerant.data}/>
            {!props.refrigerant.data.is_consumable && props.product !== undefined ? <>
                <hr/>
                <RefrigerantStockInformation product={props.product}/>
            </> : null}
        </>
    )
}

export default RefrigerantInformation