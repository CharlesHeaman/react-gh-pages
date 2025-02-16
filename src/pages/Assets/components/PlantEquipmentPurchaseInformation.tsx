import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { Asset } from "../../../types/asset.types"
import formatDate from "../../../utils/formatDate"

const PlantEquipmentPurchaseInformation = (props: {
    plantEquipmentData: Asset
}) => {
    return (
        <section>
            <h2>Purchase Information</h2>
            <InfoGrid>                    
                <GridItem title='Purchase Order Number' span={3}>
                    <p>{props.plantEquipmentData.purchase_order_number ? props.plantEquipmentData.purchase_order_number : 'None'}</p>
                </GridItem>
                <GridItem title='Purchase Date' span={3}>
                    <p>{props.plantEquipmentData.purchase_date ? formatDate(new Date(props.plantEquipmentData.purchase_date)) : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentPurchaseInformation