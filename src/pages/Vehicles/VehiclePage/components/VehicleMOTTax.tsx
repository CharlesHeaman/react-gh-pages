import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import getExpiryColor from "../../../../components/ui/ExpiryDateLabel/getExpiryColor"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import formatDate from "../../../../utils/formatDate"
import getMOTStatusDescription from "../../utils/getMOTStatusDescription"
import getMOTStatusTitle from "../../utils/getMOTStatusTitle"
import getTaxStatusDescription from "../../utils/getTaxStatusDescription"
import getTaxStatusTitle from "../../utils/getTaxStatusTitle"

const VehicleMOTTax = (props: {
    motDueDate: Date,
    taxDueDate: Date,
    preview?: boolean
}) => {
    return (
        <section>
            <h2>MOT/Tax</h2>
            {!props.preview ?
                <InfoGrid>
                    <GridItem>
                        <InnerContainer color={getExpiryColor(props.motDueDate)}>
                            <IconTitleText
                                iconFont="garage"
                                title={getMOTStatusTitle(props.motDueDate)}
                                color={getExpiryColor(props.motDueDate)}
                                text={getMOTStatusDescription(props.motDueDate)}
                            />
                        </InnerContainer>
                    </GridItem>
                    <GridItem>
                        <InnerContainer color={getExpiryColor(props.taxDueDate)}>
                            <IconTitleText
                                iconFont="fact_check"
                                title={getTaxStatusTitle(props.taxDueDate)}
                                color={getExpiryColor(props.taxDueDate)}
                                text={getTaxStatusDescription(props.taxDueDate)}
                            />
                        </InnerContainer>
                    </GridItem>
                </InfoGrid> :
                <InfoGrid>
                    <GridItem title='MOT Due Date' span={3}>
                        <p>{formatDate(props.motDueDate)}</p>           
                    </GridItem>
                    <GridItem title='Tax Due Date' span={3}>
                        <p>{formatDate(props.taxDueDate)}</p>           
                    </GridItem>
                </InfoGrid>
            }
        </section>
    )
}

export default VehicleMOTTax