import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../components/ui/Department/DepartmentLabel"
import UserLink from "../../../components/ui/Links/UserLink"
import { DepartmentResponseData } from "../../../types/department.types"
import { OnCallEngineerResponseData } from "../../../types/OnCallEngineer.types"
import { UserResponseData } from "../../../types/user.types"
import formatDate from "../../../utils/formatDate"
import formatTime from "../../../utils/formatTime"

const OnCallEngineerInfo = (props: {
    onCallEngineerData: OnCallEngineerResponseData,
    engineerData: UserResponseData,
    department: DepartmentResponseData
}) => {
    return (
        <section>
            <h2>On-call Information</h2>
            <InfoGrid>
                <GridItem title='Employee' span={3}>
                    <p><UserLink username={props.engineerData.data.username} firstName={props.engineerData.data.first_name} lastName={props.engineerData.data.last_name}/></p>
                </GridItem>
                <GridItem title='Department' span={3}>
                    <DepartmentLabel department={props.department}/>
                </GridItem>
                <GridItem title='Start Date' span={3}>
                    <p>{formatDate(props.onCallEngineerData.data.start_date)}</p>
                </GridItem>
                <GridItem title='Start Time' span={3}>
                    <p>{formatTime(props.onCallEngineerData.data.start_date)}</p>
                </GridItem>
                <GridItem title='End Date' span={3}>
                    <p>{formatDate(props.onCallEngineerData.data.end_date)}</p>
                </GridItem>
                <GridItem title='End Time' span={3}>
                    <p>{formatTime(props.onCallEngineerData.data.end_date)}</p>
                </GridItem>
            </InfoGrid>
        </section>
        // <div style={{ 
        //     display: 'grid', 
        //     gridTemplateColumns: '1fr 1fr 1fr'
        // }}>                                
        //     <LabelIconBox
        //         label="Engineer"
        //         icon="person"
        //         text={getUserFullName(props.engineerData)}
        //     />
        //     <LabelIconBox
        //         label="Start Date"
        //         icon="event_available"
        //         text={`${formatDate(props.onCallEngineerData.data.start_date)} ${formatTime(props.onCallEngineerData.data.start_date)}`}
        //     />
        //     <LabelIconBox
        //         label="End Date"
        //         icon="event_busy"
        //         text={`${formatDate(props.onCallEngineerData.data.end_date)} ${formatTime(props.onCallEngineerData.data.end_date)}`}
        //     />
        // </div>
    )
}

export default OnCallEngineerInfo