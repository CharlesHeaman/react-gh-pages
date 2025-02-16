import BooleanLabel from "../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import ExpiryDateLabel from "../../../../components/ui/ExpiryDateLabel/ExpiryDateLabel"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { Asset } from "../../../../types/asset.types"
import formatDate from "../../../../utils/formatDate"
import getCalibrationText from "../utils/getCalibrationText"
import getCalibrationTitle from "../utils/getCalibrationTitle"

const PlantEquipmentCalibration = (props: {
    plantEquipmentData: Asset,
    isPreview?: boolean,
}) => {
    return (
        <section>
            <h2>Calibration</h2>
            <InfoGrid>
                {!props.isPreview ?
                    <GridItem>
                        <InnerContainer color={props.plantEquipmentData.next_calibration_test ? getExpiryColor(props.plantEquipmentData.next_calibration_test) : 'red'}>
                            <IconTitleText
                                iconFont="compass_calibration"
                                color={props.plantEquipmentData.next_calibration_test ? getExpiryColor(props.plantEquipmentData.next_calibration_test) : 'red'}
                                title={getCalibrationTitle(props.plantEquipmentData.next_calibration_test)}
                                text={getCalibrationText(props.plantEquipmentData.next_calibration_test)}
                            />
                        </InnerContainer>
                    </GridItem> : null
                }
                <GridItem title='Calibration Test Required' span={2}>
                    <BooleanLabel true/>
                </GridItem>
                <GridItem title='Last Calibration' span={2}>
                    <p>{props.plantEquipmentData.last_calibration_test ? formatDate(props.plantEquipmentData.last_calibration_test) : 'None'}</p>
                </GridItem>
                <GridItem title='Next Calibration' span={2}>
                    <p>{props.plantEquipmentData.next_calibration_test ? <ExpiryDateLabel date={props.plantEquipmentData.next_calibration_test}/> : 'None'}</p>
                </GridItem>
                <GridItem title='Acceptable Error/Tolerance' span={2}>
                    <p>{props.plantEquipmentData.acceptable_tolerance ? props.plantEquipmentData.acceptable_tolerance : 'None'}</p>
                </GridItem>
                <GridItem title='Calibrated Externally' span={2}>
                    <BooleanLabel true={props.plantEquipmentData.calibrated_externally}/>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default PlantEquipmentCalibration