import Label from "../../../../../components/ui/General/Label/Label"

const ChangeLabel = (props: {
    type: number
}) => {
    const getLabel = (status: number) => {
        switch (status) {
            case 0:
                return <Label text='Added' color='light-green' iconFont='add'/>
            case 1:
                return <Label text='Updated' color='orange' iconFont="update"/>
            case 2:
                return <Label text='Removed' color='red' iconFont="remove"/>
            case 3:
                return <Label text='Fixed' color='purple' iconFont="bug_report"/>
            default: 
                return <Label text='Performance' color='dark-blue' iconFont="speed"/>   
        }
    }
    return (
        getLabel(props.type)
    ) 
}

export default ChangeLabel