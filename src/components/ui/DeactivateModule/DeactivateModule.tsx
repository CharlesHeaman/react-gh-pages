import SideBarButton from "../Buttons/SideBarButton/SideBarButton"
import SideBarModule from "../Containers/SideBarModule/SideBarModule"

const DeactivateModule = (props: {
    resourceName: string,
    showFunc: () => void
    reactivate?: boolean,
    actionName?: string,
    delete?: boolean
}) => {

    const actionName = (!props.actionName && !props.delete) ?
        props.reactivate ? "Reactivate" : "Deactivate"
        :
        props.delete ? 'Delete' : props.actionName

    return (
        <SideBarModule title={actionName}>
            <SideBarButton
                text={`${actionName} ${props.resourceName}`}
                iconFont={
                    !props.delete ?
                        props.reactivate ? "check_circle" : "highlight_off" :
                        'delete'
                }
                color={props.reactivate ? "light-green" : "red"}
                clickEvent={props.showFunc}
            />
        </SideBarModule>
    )
}

export default DeactivateModule