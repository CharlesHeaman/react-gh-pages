import InnerContainer from "../../../../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../../../../components/ui/IconTitleText/IconTitleText"
import UserLink from "../../../../../../../components/ui/Links/UserLink"
import { UserResponseData } from "../../../../../../../types/user.types"
import formatDate from "../../../../../../../utils/formatDate"
import getUserFullName from "../../../../../../../utils/getUserFullName"

const AssignmentStatus = (props: {
    user: UserResponseData | undefined,
    lastAssignmentUpdate: Date | undefined,
    resourceName: string
}) => {
    return (
        <InnerContainer color={props.user ? 'light-green' : 'dark-blue'}>
            {props.user ?
                <IconTitleText
                    iconFont='assignment_ind'
                    title={getUserFullName(props.user)}
                    color="light-green"
                    text={<>
                        This {props.resourceName} has been assigned to <UserLink username={props.user.data.username} firstName={props.user.data.first_name} lastName={props.user.data.last_name}/> since {props.lastAssignmentUpdate ? formatDate(props.lastAssignmentUpdate) : 'Unknown'}.
                    </>}
                /> :
                <IconTitleText
                    iconFont='person_off'
                    title='Unassigned'
                    color="dark-blue"
                    text={props.lastAssignmentUpdate ? 
                        `This ${props.resourceName} has not been assigned to a user since ${formatDate(props.lastAssignmentUpdate)}.` : 
                        `This ${props.resourceName} has never been assigned to a user.`
                    }
                />
            }
        </InnerContainer>
    )
}

export default AssignmentStatus