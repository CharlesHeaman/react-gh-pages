import { Dispatch, SetStateAction } from "react"
import DateInput from "../../../../../../../../components/form/DateInput/DateInput"
import UserSelect from "../../../../../../../../components/form/UserSelect/UserSelect"
import GridItem from "../../../../../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { AssignTicketAttributes } from "../../../../../../../../types/tickets.types"
import { UserResponseData } from "../../../../../../../../types/user.types"

const TicketAssignForm = (props: {
    assignEngineerAttributes: AssignTicketAttributes,
    updateDateParams: (date: Date, name: string) => void, 
    selectedEngineer1: UserResponseData | undefined,
    setSelectedEngineer1: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedEngineer2: UserResponseData | undefined,
    setSelectedEngineer2: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedEngineer3: UserResponseData | undefined,
    setSelectedEngineer3: Dispatch<SetStateAction<UserResponseData | undefined>>,
    selectedEngineer4: UserResponseData | undefined,
    setSelectedEngineer4: Dispatch<SetStateAction<UserResponseData | undefined>>,
    showErrors: boolean
}) => {
    
    return (
        <InfoGrid>
            <GridItem title='Visit Date'>
                <DateInput
                    name="visit_date"
                    label="Visit date"
                    value={props.assignEngineerAttributes.visit_date}
                    updateFunc={props.updateDateParams}
                    required
                    min={new Date()}
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
            <GridItem title='Engineer #1'>
                <UserSelect 
                    selectedUser={props.selectedEngineer1} 
                    setSelectedUser={props.setSelectedEngineer1} 
                    required
                    hasSubmitted={props.showErrors}           
                />
            </GridItem>
            {props.selectedEngineer1 ? <>
                <GridItem title='Engineer #2'>
                    <UserSelect 
                        selectedUser={props.selectedEngineer2} 
                        setSelectedUser={props.setSelectedEngineer2} 
                        hasSubmitted={props.showErrors}           
                    />
                </GridItem>
                {props.selectedEngineer2 ? <>
                    <GridItem title='Engineer #3'>
                        <UserSelect 
                            selectedUser={props.selectedEngineer3} 
                            setSelectedUser={props.setSelectedEngineer3} 
                            hasSubmitted={props.showErrors}           
                        />
                    </GridItem>
                    {props.selectedEngineer3 ? 
                        <GridItem title='Engineer #4'>
                            <UserSelect 
                                selectedUser={props.selectedEngineer4} 
                                setSelectedUser={props.setSelectedEngineer4} 
                                hasSubmitted={props.showErrors}           
                            />
                        </GridItem>
                    : null}
                </> : null}
            </> : null}
        </InfoGrid>
    )
}

export default TicketAssignForm 