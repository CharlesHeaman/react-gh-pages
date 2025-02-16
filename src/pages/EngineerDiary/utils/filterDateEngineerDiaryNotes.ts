import isSameDay from '../../../utils/isSameData';
import { DiaryNoteResponseData } from './../../../types/diaryNotes.types';

const filterDateEngineerDiaryNotes = (diaryNotes: Array<DiaryNoteResponseData>, date: Date) => {
    return diaryNotes.filter(note => isSameDay(new Date(note.data.date), new Date(date)))
}

export default filterDateEngineerDiaryNotes