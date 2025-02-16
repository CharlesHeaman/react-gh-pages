import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import UserLink from "../../../../components/ui/Links/UserLink"
import getTimeGridStatusColour from "../../utils/getTimeGridStatusColour"
import getTimeGridStatusDescription from "../../utils/getTimegridStatusDescription"
import getTimeGridStatusIcon from "../../utils/getTimegridStatusIcon"
import getTimeGridStatusText from "../../utils/getTimegridStatusText"
import { TimegridResponseData } from "../../../../types/timegrid.types"
import { UserResponseData } from "../../../../types/user.types"
import formatDate from "../../../../utils/formatDate";

const TimegridInformation = (props: {
    timegrid: TimegridResponseData | undefined,
    user: UserResponseData,
    timegridDate: Date
}) => {
    return (
        <>
            <section>
                <InnerContainer color={getTimeGridStatusColour(props.timegrid?.data.status)}>
                    <IconTitleText 
                        title={`Timegrid ${getTimeGridStatusText(props.timegrid?.data.status)}`} 
                        text={getTimeGridStatusDescription(props.timegrid?.data.status)} 
                        iconFont={getTimeGridStatusIcon(props.timegrid?.data.status)}
                        color={getTimeGridStatusColour(props.timegrid?.data.status)}
                    />
                </InnerContainer>
            </section>
            <section>
                <h2>Timegrid Details</h2>
                <InfoGrid>
                    <GridItem title='Engineer' span={3}>
                        <UserLink 
                            username={props.user.data.username} 
                            firstName={props.user.data.first_name} 
                            lastName={props.user.data.last_name}
                        />
                    </GridItem>
                    <GridItem title='Date' span={3}>
                        <p>{formatDate(props.timegridDate)}</p>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
        </>
    )
}

export default TimegridInformation 