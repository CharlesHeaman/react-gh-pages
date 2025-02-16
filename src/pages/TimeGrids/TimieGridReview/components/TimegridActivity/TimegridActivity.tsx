import ActivityItem from "../../../../../components/ui/ActivityWrapper/ActivityItem"
import ActivityWrapper from "../../../../../components/ui/ActivityWrapper/ActivityWrapper"
import { TimegridActivityResponseData } from "../../../../../types/timegridActivity.types"
import { UserResponseData } from "../../../../../types/user.types"
import findUser from "../../../../../utils/findUser"
import getTimegridActivityIcon from "./utils/getTimegridActivityIcon"
import getTimegridActivityText from "./utils/getTimegridActivityText"

const TimegridActivity = (props: {
    timegridActivities: Array<TimegridActivityResponseData>,
    users: Array<UserResponseData>
}) => {
    return (
        <section>
            <ActivityWrapper>
                {props.timegridActivities.reverse().map((timegridActivity, index) =>
                    <ActivityItem
                        iconFont={getTimegridActivityIcon(timegridActivity.data.type)}
                        text={getTimegridActivityText(timegridActivity.data.type, findUser(props.users, timegridActivity.data.activity_by_id))}
                        date={timegridActivity.data.activity_date}
                        key={index}
                    />
                )}
            </ActivityWrapper>
        </section>
    )
}

export default TimegridActivity