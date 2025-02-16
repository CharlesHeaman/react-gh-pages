import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import FilterSelect, { FilterSelection } from '../../ui/FilterSelect/FilterSelect';
import MarkdownDisplay from './components/MarkdownDisplay';
import styles from './MarkdownEditor.module.css';

const MarkdownEditor = (props: {
    content: string,
    setter: (content: string) => void,
    placeholder?: string,
    minRows?: number,
    startPreview?: boolean
}) => {

    const editorFilterOptions = [
        {
            text: 'Edit',
            value: true,
            iconFont: 'edit',
            selected: !props.startPreview
        },
        {
            text: 'Preview',
            value: false,
            iconFont: 'visibility',
            selected: props.startPreview
        }
    ];

    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>(editorFilterOptions);

    var selectOption = selectOptions.find(selection => selection.selected);
    var isEditMode: boolean = selectOption ? selectOption.value as boolean : true;

    return (
        <div className={styles['markdown-editor-wrapper']}>
            <div className={styles['header']}>
                <FilterSelect
                    selections={selectOptions}
                    selectionSetter={setSelectOptions}
                />
                {/* <nav>
                    <button 
                        className={`${styles['tab-button']} ${preview ? '' : styles['selected']}`}    
                        onClick={() => setPreview(false)}
                    >
                        Write
                    </button>
                    <button 
                        className={`${styles['tab-button']} ${preview ? styles['selected'] : ''}`}    
                        onClick={() => setPreview(true)}
                    >
                        Preview
                    </button>
                </nav> */}
                {isEditMode && 
                    <div className={styles['formatter-wrapper']}>
                        <div className={styles['button-group']}>
                            <button className={styles['formatter-button']}><span className='material-icons'>title</span></button>
                            <button className={styles['formatter-button']}><span className='material-icons'>format_bold</span></button>
                            <button className={styles['formatter-button']}><span className='material-icons'>format_italic</span></button>
                        </div>
                        <div className={styles['button-group']}>
                            <button className={styles['formatter-button']}><span className='material-icons'>format_indent_increase</span></button>
                        </div>
                        <div className={styles['button-group']}>
                            <button className={styles['formatter-button']}><span className='material-icons'>link</span></button>
                        </div>
                        <div className={styles['button-group']}>
                            <button className={styles['formatter-button']}><span className='material-icons'>format_list_bulleted</span></button>
                            <button className={styles['formatter-button']}><span className='material-icons'>format_list_numbered</span></button>
                        </div>
                        <div className={styles['button-group']}>
                            <button className={styles['formatter-button']}><span className='material-icons'>code</span></button>
                        </div>
                        {/* <div className={styles['button-group']}>
                            <button className={styles['formatter-button']}><span className='material-icons'>help_outline</span></button>
                        </div> */}
                    </div>
                }
            </div>
            <div className={styles['body']}>
                {isEditMode ? 
                    <TextareaAutosize 
                        minRows={props.minRows ? props.minRows : 10} 
                        onChange={(e) => props.setter(e.target.value)}
                        placeholder={props.placeholder}
                    >
                        {props.content}
                    </TextareaAutosize> :
                    <MarkdownDisplay markdown={props.content}/>
                }
            </div>
        </div>
    )
}

export default MarkdownEditor