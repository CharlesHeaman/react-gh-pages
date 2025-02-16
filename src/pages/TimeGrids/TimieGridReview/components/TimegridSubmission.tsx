import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import IconTitleText from "../../../../components/ui/IconTitleText/IconTitleText"
import { TimegridResponseData } from "../../../../types/timegrid.types"
import { UserResponseData } from "../../../../types/user.types"
import findUserTimegrid from "../../../../utils/findUserTimegrid"
import getUserFullName from "../../../../utils/getUserFullName"
import TimegridRow from "../../TimeGridSummary/components/TimegridList/components/TimegridRow"

const TimegridSubmission = (props: {
    user: UserResponseData,
    engineerCount: number,
    submittedCount: number,
    engineerTimegridData: Array<TimegridResponseData>,
    engineerUserData: Array<UserResponseData>,
    date: Date
}) => {

    const isAllSubmitted = props.submittedCount >= props.engineerCount;
    
    const getUserTimegrid = (userID: number): TimegridResponseData => {
        const timegrid = findUserTimegrid(props.engineerTimegridData, userID)
        if (timegrid) return timegrid
        return {
            id: -1,
            data: {
                user_id: props.user.id,
                date: props.date,
                status: -1,
                is_authorisation_required: false,
                comment: null
            },
            object: 'timegrid',
            url: '',
            data_updated_at: new Date()
        }
    }

    return (
        <>
            <section>
                <h2>Timegrid Submission</h2>
                <InfoGrid>
                    <GridItem>
                        <InnerContainer color={!isAllSubmitted ? 'red' : 'light-green'}>
                            <IconTitleText
                                iconFont={!isAllSubmitted ? 'not_interested' : 'done'}
                                color={!isAllSubmitted ? 'red' : 'light-green'}
                                title={!isAllSubmitted ? 'Timegrids Outstanding' : 'All Timegrids Submitted'}
                                text={!isAllSubmitted ? `Some timegrids for engineers assigned to common tickets with ${getUserFullName(props.user)} are still outstanding.` : `All timegrids for engineers assigned to common tickets with ${getUserFullName(props.user)} have been submitted.`}
                            />
                        </InnerContainer>
                    </GridItem>
                    <GridItem>
                        <div className="table-wrapper">
                            <table>
                                <thead>
                                    <th>Timegrid Code</th>
                                    <th>Engineer</th>
                                    <th>Status</th>
                                </thead>
                                <tbody>
                                    {props.engineerUserData.map((user, index) => 
                                        <TimegridRow
                                            user={user}
                                            timegrid={getUserTimegrid(user.id)}
                                            departmentName=""
                                            date={props.date}
                                            key={index}
                                        />                                                                   
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </GridItem>
                </InfoGrid>
            </section>
            <hr/>
        </>
    )
}

export default TimegridSubmission