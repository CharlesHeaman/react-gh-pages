import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { Asset } from "../../../../types/asset.types"
import formatDate from "../../../../utils/formatDate"
import getMaintenanceText from "../utils/getMaintenanceText"
import getMaintenanceTitle from "../utils/getMaintenanceTitle"

const PlantEquipmentMaintenance = (props: {
    plantEquipmentData: Asset,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Maintenance</h2>
            <InfoGrid>
                {!props.isPreview ?
                    <GridItem>
                        <InnerContainer color={props.plantEquipmentData.next_maintenance ? getExpiryColor(props.plantEquipmentData.next_maintenance) : 'red'}>
                            <IconTitleText
                                iconFont="home_repair_service"
                                color={props.plantEquipmentData.next_maintenance ? getExpiryColor(props.plantEquipmentData.next_maintenance) : 'red'}
                                title={getMaintenanceTitle(props.plantEquipmentData.next_maintenance)}
                                text={getMaintenanceText(props.plantEquipmentData.next_maintenance)}
                            />
                        </InnerContainer>
                    </GridItem> : null
                }
                <GridItem title='Maintenance Required' span={2}>
                    <BooleanLabel true/>
                </GridItem>
                <GridItem title='Last Maintenance' span={2}>
                    <p>{props.plantEquipmentData.last_maintenance ? formatDate(props.plantEquipmentData.last_maintenance) : 'None'}</p>
                </GridItem>
                <GridItem title='Next Maintenance' span={2}>
                    <p>{props.plantEquipmentData.next_maintenance ? <ExpiryDateLabel date={props.plantEquipmentData.next_maintenance}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Maintained Externally' span={2}>
                    <BooleanLabel true={props.plantEquipmentData.maintained_externally}/>
                </GridItem>
                <GridItem title='External Maintainer' span={2}>
                    <p>{props.plantEquipmentData.external_maintainer ? props.plantEquipmentData.external_maintainer : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentMaintenance