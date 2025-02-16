import Label from '../../../../components/ui/General/Label/Label';
import { ReactComponent as CompleteImg } from './../../../../assets/images/done_black_24dp.svg';
import { ReactComponent as LockImg } from './../../../../assets/images/lock_black_24dp.svg';
import { ReactComponent as UnableImg } from './../../../../assets/images/cancel_black_24dp.svg';
import { ReactComponent as OpenImg } from './../../../../assets/images/lock_open_black_24dp.svg';

function TicketStatus(props) {
    return (
        // Not Performed
        props.isUnableToCarryOut ? <Label text='Not Performed' icon={<UnableImg/>} color='red' hideText={props.hideText} hideIcon={props.hideIcon}/> : 
        // Job Complete
        props.isJobComplete ? <Label text='Job Complete' icon={<CompleteImg/>} color='purple' hideText={props.hideText} hideIcon={props.hideIcon}/> : 
        // Complete
        props.isComplete ? <Label text='Report Complete' icon={<CompleteImg/>} color='dark-blue' hideText={props.hideText} hideIcon={props.hideIcon}/> : 
        // Locked
        props.isLocked ? <Label text='Locked' icon={<LockImg/>} color='red' hideText={props.hideText} hideIcon={props.hideIcon}/> : 
        // Working
        props.isStarted ? <Label text='Open' icon={<OpenImg/>} color='light-green' hideText={props.hideText} hideIcon={props.hideIcon}/> :
        // Open
        <Label text='Open' icon={<OpenImg/>} color='light-blue' hideText={props.hideText} hideIcon={props.hideIcon}/>
    )
}

export default TicketStatus