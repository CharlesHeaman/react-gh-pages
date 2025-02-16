import { ChangeEvent, useEffect, useState } from "react";
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton";
import WindowOverlay from "../../../../components/ui/Containers/WindowOverlay/WindowOverlay";
import { CreateDiaryNoteAttributes } from "../../../../types/diaryNotes.types";
import DiaryNoteCreateForm from "./DiaryNoteCreateForm";
import updateStateCheckboxParams from "../../../../utils/updateStateParams/updateStateCheckboxParams";
import updateStateDateParams from "../../../../utils/updateStateParams/updateStateDateParams";
import updateStateParams from "../../../../utils/updateStateParams/updateStateParams";
import postAPI from "../../../../utils/postAPI";

const CreateDiaryNote = (props: {
    show: boolean,
    hideFunc: () => void,
    getDiaryNotes: () => void,
    currentCreateDate: Date | undefined,
    departmentID: number,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [diaryNoteAttributes, setDiaryNoteAttributes] = useState<CreateDiaryNoteAttributes>({
        date: props.currentCreateDate ? new Date(props.currentCreateDate) : new Date(),
        text: '',
        is_important: false,
        is_all_departments: false,
    })

    useEffect(() => {
        setDiaryNoteAttributes({
            date: props.currentCreateDate ? new Date(props.currentCreateDate) : new Date(),
            text: '',
            is_important: false,
            is_all_departments: false,
        })
    }, [props.currentCreateDate])

    const updateParams = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        updateStateParams(event, setDiaryNoteAttributes)
    }

    const updateCheckboxParams = (event: ChangeEvent<HTMLInputElement>) => {
        updateStateCheckboxParams(event, setDiaryNoteAttributes)
    }

    const updateDateParams = (date: Date, name: string) => {
        updateStateDateParams(date, name, setDiaryNoteAttributes)
    }

    const formComplete = (
        diaryNoteAttributes.text.length > 0
    );

    const createNote = () => {
        setHasSubmitted(true);
        if (!formComplete) return;
        postAPI('diary_notes/create', {}, {
            ...diaryNoteAttributes,
            department_id: diaryNoteAttributes.is_all_departments ? undefined : props.departmentID
        }, () => {
            props.getDiaryNotes();
            props.hideFunc();
            setHasSubmitted(false)
        }, setSubmitting)
    }
    
    return (
        <WindowOverlay 
            title="Create Diary Note"
            maxWidth={350}
            show={props.show}
            hideFunc={props.hideFunc}
            footer={<SubmitButton
                text="Create Note"
                clickFunc={createNote}
                submitting={submitting}
                submittingText="Creating..."
                iconFont="notes"
                disabled={hasSubmitted && !formComplete}
            />}
        >
            <DiaryNoteCreateForm 
                diaryNoteAttributes={diaryNoteAttributes} 
                updateParams={updateParams}
                updateCheckboxParams={updateCheckboxParams}
                updateDateParams={updateDateParams} 
                showErrors={hasSubmitted}            
            />
        </WindowOverlay>
    )
}

export default CreateDiaryNote