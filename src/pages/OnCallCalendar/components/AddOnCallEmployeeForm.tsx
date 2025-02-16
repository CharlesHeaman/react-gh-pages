import { Dispatch, SetStateAction } from "react"
import DateInput from "../../../components/form/DateInput/DateInput"
import TimeSelect from "../../../components/form/TimeSelect/TimeSelect"
import UserSelect from "../../../components/form/UserSelect/UserSelect"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { UserResponseData } from "../../../types/user.types"

const AddOnCallEmployeeForm = (props: {
    departmentID?: number,
    selectedEngineer: UserResponseData | undefined,
    setSelectedEngineer: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedStartTime: Date,
    setSelectedStartTime: Dispatch<SetStateAction<Date>>,
    selectedStartDate: Date,
    setSelectedStartDate: Dispatch<SetStateAction<Date>>,
    selectedEndTime: Date,
    setSelectedEndTime: Dispatch<SetStateAction<Date>>,
    selectedEndDate: Date,
    setSelectedEndDate: Dispatch<SetStateAction<Date>>,
    hasSubmitted: boolean,
    isEdit?: boolean,
}) => {
    return (
        <section>
            {props.isEdit && <h2>On-call Information</h2>}
            <InfoGrid>
                <GridItem title='Employee'>
                    <UserSelect 
                        selectedUser={props.selectedEngineer} 
                        setSelectedUser={props.setSelectedEngineer}
                        hasSubmitted={props.hasSubmitted}
                        departmentID={props.departmentID}
                        required
                    />
                </GridItem>
                <GridItem title='Start Date' span={3}>
                    <DateInput 
                        name={"start_date"} 
                        value={props.selectedStartDate} 
                        updateFunc={(date: Date, _) => props.setSelectedStartDate(date)}
                        required
                    />
                </GridItem>
                <GridItem title='Start Time' span={3}>
                    <TimeSelect 
                        value={props.selectedStartTime}
                        updateFunc={(date: Date) => props.setSelectedStartTime(date)}
                        minuteIntervals={60}
                        required
                    />
                </GridItem>
                <GridItem title='End Date' span={3}>
                    <DateInput 
                        name={"end_date"} 
                        value={props.selectedEndDate} 
                        updateFunc={(date: Date, _) => props.setSelectedEndDate(date)}
                        min={props.selectedStartDate}
                        required
                    />
                </GridItem>
                <GridItem title='End Time' span={3}>
                    <TimeSelect 
                        value={props.selectedEndTime}
                        updateFunc={(date: Date) => props.setSelectedEndTime(date)}
                        minuteIntervals={60}
                        required
                    />
                </GridItem>
            </InfoGrid>
        </section>
    )
}

export default AddOnCallEmployeeForm