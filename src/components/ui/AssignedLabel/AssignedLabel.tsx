import Label from "../General/Label/Label"

const AssignedLabel = (props: {
    isAssigned?: boolean
}) => {
    return (
        <Label
            text={props.isAssigned ? 'Assigned' : 'Not Assigned'}
            iconFont={props.isAssigned ? 'assignment_ind' : 'person_off'}
            color={props.isAssigned ? 'light-green' : 'dark-blue'}
        />
    )
}

export default AssignedLabel