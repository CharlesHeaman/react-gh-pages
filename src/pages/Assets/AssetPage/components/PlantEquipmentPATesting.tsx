import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { Asset } from "../../../../types/asset.types"
import formatDate from "../../../../utils/formatDate"
import getPATText from "../utils/getPATText"
import getPATTitle from "../utils/getPATTitle"

const PlantEquipmentPATesting = (props: {
    plantEquipmentData: Asset,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>PA Testing</h2>
            <InfoGrid>
                {!props.isPreview ?
                    <GridItem>
                        <InnerContainer color={props.plantEquipmentData.next_pa_test ? getExpiryColor(props.plantEquipmentData.next_pa_test) : 'red'}>
                            <IconTitleText
                                iconFont="domain_verification"
                                color={props.plantEquipmentData.next_pa_test ? getExpiryColor(props.plantEquipmentData.next_pa_test) : 'red'}
                                title={getPATTitle(props.plantEquipmentData.next_pa_test)}
                                text={getPATText(props.plantEquipmentData.next_pa_test)}
                            />
                        </InnerContainer>
                    </GridItem> : null
                }
                <GridItem title='PA Test Required' span={2}>
                    <BooleanLabel true/>
                </GridItem>
                <GridItem title='Last PA Test' span={2}>
                    <p>{props.plantEquipmentData.last_pa_test ? formatDate(props.plantEquipmentData.last_pa_test) : 'None'}</p>
                </GridItem>
                <GridItem title='Next PA Test' span={2}>
                    <p>{props.plantEquipmentData.next_pa_test ? <ExpiryDateLabel date={props.plantEquipmentData.next_pa_test}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Test Voltage' span={2}>
                    <p>{props.plantEquipmentData.pa_test_volts}V</p>
                </GridItem>
                <GridItem title='Test Amps' span={2}>
                    <p>{props.plantEquipmentData.pa_test_amps}A</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentPATesting