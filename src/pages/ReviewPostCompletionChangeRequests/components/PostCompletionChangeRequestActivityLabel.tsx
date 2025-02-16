import Label from "../../../components/ui/General/Label/Label"

const PostCompletionChangeRequestActivityLabel = (props: {
    action: number
}) => {
    const getLabel = () => {
        switch (props.action) {
            case 1:
                return <Label text="Accepted" iconFont="thumb_down" color="light-green"/>
            case 2:
                return <Label text="Denied" iconFont="thumb_up" color="red"/>
            default:
                return <Label text="Created" iconFont="add" color="dark-blue"/>
        }
    }

    return getLabel();
}
    
export default PostCompletionChangeRequestActivityLabel