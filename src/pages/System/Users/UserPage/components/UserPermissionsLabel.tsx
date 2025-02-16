import Label from "../../../../../components/ui/General/Label/Label";

const UserPermissionLabel = (props: {
    permissions: number,
    hideText?: boolean
}) => {
    switch (props.permissions) {
        case 3:
            return <Label 
                text="Superuser"
                iconFont="workspace_premium"
                color="dark-blue"
                hideText={props.hideText}
            />      
        case 2:
            return <Label 
                text="Admin"
                iconFont="badge"
                color="light-green"
                hideText={props.hideText}
            />
        case 1:
            return <Label 
                text="Read-only"
                iconFont="visibility"
                color="orange"
                hideText={props.hideText}
            />
        default:
            return <Label 
                text="None"
                iconFont="block"
                color="red"
                hideText={props.hideText}
            />
    }
}

export default UserPermissionLabel