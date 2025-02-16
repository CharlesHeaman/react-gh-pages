import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { Asset } from "../../../../types/asset.types"
import formatDate from "../../../../utils/formatDate"
import getInspectionText from "../utils/getInspectionText"
import getInspectionTitle from "../utils/getInspectionTitle"

const PlantEquipmentInspection = (props: {
    plantEquipmentData: Asset,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Inspection</h2>
            <InfoGrid>
                {!props.isPreview ?
                    <GridItem>
                        <InnerContainer color={props.plantEquipmentData.next_inspection ? getExpiryColor(props.plantEquipmentData.next_inspection) : 'red'}>
                            <IconTitleText
                                iconFont="assignment_turned_in"
                                color={props.plantEquipmentData.next_inspection ? getExpiryColor(props.plantEquipmentData.next_inspection) : 'red'}
                                title={getInspectionTitle(props.plantEquipmentData.next_inspection)}
                                text={getInspectionText(props.plantEquipmentData.next_inspection)}
                            />
                        </InnerContainer>
                    </GridItem> : null
                }   
                <GridItem title='Inspection Required' span={2}>
                    <BooleanLabel true/>
                </GridItem>
                <GridItem title='Last Inspection' span={2}>
                    <p>{props.plantEquipmentData.last_inspection ? formatDate(props.plantEquipmentData.last_inspection) : 'None'}</p>
                </GridItem>
                <GridItem title='Next Inspection' span={2}>
                    <p>{props.plantEquipmentData.next_inspection ? <ExpiryDateLabel date={props.plantEquipmentData.next_inspection}/> : 'None'}</p>
                </GridItem>

            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentInspection