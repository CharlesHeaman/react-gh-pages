import { ChangeEvent } from "react"
import DateInput from "../../../../components/form/DateInput/DateInput"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import { CreateDiaryNoteAttributes } from "../../../../types/diaryNotes.types"
import TextareaInput from "../../../../components/form/TextareaInput/TextareaInput"
import CheckboxInput from "../../../../components/form/CheckboxInput/CheckboxInput"

const DiaryNoteCreateForm = (props: {
    diaryNoteAttributes: CreateDiaryNoteAttributes,
    updateParams: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
    updateCheckboxParams: (event: ChangeEvent<HTMLInputElement>) => void,
    updateDateParams: (date: Date, name: string) => void, 
    showErrors: boolean
}) => {
    
    return (
        <InfoGrid>
            <GridItem title='Date'>
                <DateInput
                    name="date"
                    label="Date"
                    value={props.diaryNoteAttributes.date}
                    updateFunc={props.updateDateParams}
                    required
                    hasSubmitted={props.showErrors}
                />
            </GridItem>
            <GridItem title='Note'>
                <TextareaInput 
                    name={"text"} 
                    label="Note text"
                    value={props.diaryNoteAttributes.text} 
                    updateFunc={props.updateParams} 
                    required
                    hasSubmitted={props.showErrors}   
                    autoFocus            
                />
            </GridItem>
            <GridItem title='Important' span={3}>
                <CheckboxInput 
                    name={"is_important"} 
                    checked={props.diaryNoteAttributes.is_important} 
                    updateFunc={props.updateCheckboxParams}
                />
            </GridItem>
            <GridItem title='All Departments' span={3}>
                <CheckboxInput 
                    name={"is_all_departments"} 
                    checked={props.diaryNoteAttributes.is_all_departments} 
                    updateFunc={props.updateCheckboxParams}
                />
            </GridItem>
        </InfoGrid>
    )
}

export default DiaryNoteCreateForm 