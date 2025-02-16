import Label from "../../../../../components/ui/General/Label/Label";

const DepartmentModuleStatusLabel = (props: {
    enabled: boolean
}) => {
    return <Label 
        text={`${props.enabled ? 'Enabled' : 'Disabled'}` }
        iconFont={props.enabled ? 'check_circle' : 'not_interested'}
        color={props.enabled ? 'light-green' : 'red'}
    /> 
}

export default DepartmentModuleStatusLabel