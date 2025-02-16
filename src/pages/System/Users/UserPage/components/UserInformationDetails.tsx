import BooleanLabel from "../../../../../components/ui/BooleanLabel/BooleanLabel"
import GridItem from "../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import DepartmentLabel from "../../../../../components/ui/Department/DepartmentLabel"
import Label from "../../../../../components/ui/General/Label/Label"
import { DepartmentResponseData } from "../../../../../types/department.types"
import { User } from "../../../../../types/user.types"

const UserInformationDetails = (props: {
    userData: User,
    department: DepartmentResponseData | undefined
}) => {
    return (
        <section>
            <h2>User Information</h2>
            <InfoGrid>
                <GridItem title='Username' span={3}>
                    <p>{props.userData.username}</p>
                </GridItem>
                <GridItem title='Job Title' span={3}>
                    <p>{props.userData.job_title ? props.userData.job_title : 'Unknown'}</p>
                </GridItem>
                <GridItem title='First Name' span={3}>
                    <p>{props.userData.first_name}</p>
                </GridItem>
                <GridItem title='Last Name' span={3}>
                    <p>{props.userData.last_name}</p>
                </GridItem>
                <GridItem title='Primary Department'>
                    {props.department ? 
                        <DepartmentLabel department={props.department}/> : 
                        <Label text="None" iconFont="not_interested" color="no-color"/>
                    }
                </GridItem>
                <GridItem title='Is Engineer' span={2}>
                    <BooleanLabel true={props.userData.is_engineer}/>
                </GridItem>
                <GridItem title='Notes'>
                    <p>{props.userData.notes ? props.userData.notes : 'None'}</p>
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default UserInformationDetails