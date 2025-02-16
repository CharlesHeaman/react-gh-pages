import ListItem from '../../../../../client/src/components/ui/Containers/ListItem/ListItem'
import ListWrapper from '../../../../../client/src/components/ui/Containers/ListWrapper/ListWrapper'
import styles from './TimeLineDateWrapper.module.css'
import { ReactComponent as TermsImg } from './../../../assets/images/gavel_black_24dp.svg';

function TimeLineDateWrapper(props) {
    return (
        <div className={styles['timeline-date-wrapper']}>
            <div className={styles['icon']}>
                <TermsImg/>
            </div>
            <h3>{props.date}</h3>
            <div className={styles['body']}>
                <ListWrapper>
                    <ListItem>
                        <h3>Send Quote</h3>
                        <h4>Chris Perks</h4>
                    </ListItem>
                    <ListItem>
                        <h3>Updated Costings</h3>
                        <h4>Chris Perks</h4>
                    </ListItem>
                    <ListItem>
                        <h3>Created Quote</h3>
                        <h4>Chris Perks</h4>
                    </ListItem>
                </ListWrapper>
            </div>
        </div>
    )
}

export default TimeLineDateWrapper