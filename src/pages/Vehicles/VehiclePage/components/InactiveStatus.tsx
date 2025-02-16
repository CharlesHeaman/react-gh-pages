import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import formatDate from "../../../../utils/formatDate"

const InactiveStatus = (props: {
    resourceName: string,
    inactiveDate: Date | undefined
}) => {
    return (
        <section>
            <InnerContainer color='red'>
                <IconTitleText
                    iconFont="highlight_off"
                    title={`${props.resourceName} Inactive`}
                    color='red'
                    text={`This ${props.resourceName.toLocaleLowerCase()} was made inactive on ${props.inactiveDate ? formatDate(props.inactiveDate) : 'unknown'}.`}
                />
            </InnerContainer>
        </section>
    )
}

export default InactiveStatus