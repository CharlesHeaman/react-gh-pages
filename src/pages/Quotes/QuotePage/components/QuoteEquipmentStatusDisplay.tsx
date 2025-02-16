import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import getQuotedEquipmentStatusColor from "../../utils/getQuotedEquipmentStatusColor"
import getQuotedEquipmentStatusDescription from "../../utils/getQuotedEquipmentStatusDescription"
import getQuotedEquipmentStatusIcon from "../../utils/getQuotedEquipmentStatusIcon"
import getQuotedEquipmentStatusTitle from "../../utils/getQuotedEquipmentStatusTitle"

const QuotedEquipmentStatusDisplay = (props: {
    status: number,
    isSite?: boolean
}) => {
    return (
        <section>
            <InnerContainer color={getQuotedEquipmentStatusColor(props.status)}>
                <IconTitleText 
                    title={`${!props.isSite ? 'Equipment' : 'Site'} Quote ${getQuotedEquipmentStatusTitle(props.status)}`}
                    text={getQuotedEquipmentStatusDescription(props.status, props.isSite)} 
                    color={getQuotedEquipmentStatusColor(props.status)}
                    iconFont={getQuotedEquipmentStatusIcon(props.status)}
                />
            </InnerContainer>
        </section>
    )
}

export default QuotedEquipmentStatusDisplay