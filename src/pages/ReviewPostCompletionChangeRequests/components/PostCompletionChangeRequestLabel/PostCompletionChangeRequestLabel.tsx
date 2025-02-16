import Label from '../../../../components/ui/General/Label/Label';
import getPostCompletionChangeRequestStatusColor from '../../utils/getPostCompletionChangeRequestStatusColor';
import getPostCompletionChangeRequestStatusIcon from '../../utils/getPostCompletionChangeRequestStatusIcon';
import getPostCompletionChangeRequestStatusTitle from '../../utils/getPostCompletionChangeRequestStatusTitle';

const PostCompletionChangeRequestLabel = (props: {
    status: number,
    hideText?: boolean
}) => {
    return <Label 
        text={getPostCompletionChangeRequestStatusTitle(props.status)}
        iconFont={getPostCompletionChangeRequestStatusIcon(props.status)}
        color={getPostCompletionChangeRequestStatusColor(props.status)}
        hideText={props.hideText}
    />;
}

export default PostCompletionChangeRequestLabel