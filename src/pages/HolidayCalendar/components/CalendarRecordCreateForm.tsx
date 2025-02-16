import { Dispatch, SetStateAction } from "react"
import CalendarActivitySelect from "../../../components/form/CalendarActivitySelect/CalendarActivitySelect"
import DateInput from "../../../components/form/DateInput/DateInput"
import UserSelect from "../../../components/form/UserSelect/UserSelect"
import GridItem from "../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CalendarActivityResponseData } from "../../../types/calendarActivity.types"
import { CreateCalendarRecordAttributes } from "../../../types/calendarRecord.types"
import { UserResponseData } from "../../../types/user.types"

const CalendarRecordCreateForm = (props: {
    calendarRecordAttributes: CreateCalendarRecordAttributes,
    updateDateParams: (date: Date, name: string) => void, 
    selectedUser: UserResponseData | undefined,
    setSelectedUser: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedType: CalendarActivityResponseData | undefined,
    setSelectedType: Dispatch<SetStateAction<CalendarActivityResponseData | undefined>>,
    showErrors: boolean
}) => {
    
    return (
        <InfoGrid>
            <GridItem title='User'>
                <UserSelect 
                    selectedUser={props.selectedUser} 
                    setSelectedUser={props.setSelectedUser} 
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
            <GridItem title='Type'>
                <CalendarActivitySelect 
                    selectedActivity={props.selectedType}
                    setSelectedActivity={props.setSelectedType} 
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
            <GridItem title='Start Date' span={3}>
                <DateInput
                    name="start_date"
                    label="Start date"
                    value={props.calendarRecordAttributes.start_date}
                    updateFunc={props.updateDateParams}
                    max={props.calendarRecordAttributes.end_date}
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
            <GridItem title='End Date' span={3}>
                <DateInput
                    name="end_date"
                    label="End date"
                    value={props.calendarRecordAttributes.end_date}
                    updateFunc={props.updateDateParams}
                    min={props.calendarRecordAttributes.start_date}
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
        </InfoGrid>
    )
}

export default CalendarRecordCreateForm 