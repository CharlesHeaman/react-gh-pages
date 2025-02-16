import Label from "../../../components/ui/General/Label/Label"
import { DiaryNoteResponseData } from "../../../types/diaryNotes.types"
import { UserResponseData } from "../../../types/user.types"
import getUserFullName from "../../../utils/getUserFullName"
import styles from "./DiaryNotes.module.css"

const DiaryNote = (props: {
    diaryNote: DiaryNoteResponseData,
    user: UserResponseData | undefined,
    vertical?: boolean
}) => {
    return (
        <div 
            className={`
                ${styles['diary-note']}
                ${props.diaryNote.data.is_important ? styles['important'] : ''}
                ${props.vertical ? styles['vertical'] : ''}
            `}
        >
            <div className={styles['note-header']}>
                {!props.diaryNote.data.is_important ? 
                    <Label
                        iconFont="notes"
                        color="grey"
                        noBackground
                    /> :
                    <Label
                        iconFont="priority_high"
                        color="red"
                        noBackground
                    />
                }
                <h3>{props.user ? getUserFullName(props.user) : 'Unknown'}</h3>
                {props.diaryNote.data.department_id === null ? <Label
                    iconFont="public"
                    color="dark-blue"
                    noBackground
                /> : null}
            </div>
            <p>{props.diaryNote.data.text}</p>
        </div>
    )
}

export default DiaryNote