import { Dispatch, SetStateAction } from 'react';
import styles from './FilterSelect.module.css';

export interface FilterSelection {
    text: string,
    value: boolean | undefined | number | string | Array<number>,
    selected?: boolean,
    iconFont?: string,
    color?: string
}

const FilterSelect = (props: {
    selections: Array<FilterSelection>,
    selectionSetter: Dispatch<SetStateAction<Array<FilterSelection>>>,
}) => {
    const updateSelection = (selectionIndex: number) => {
        props.selectionSetter(prevState => {
            return prevState.map((selection, index) => {
                return (selectionIndex === index ? 
                        {
                            ...selection,
                            selected: true
                        } :
                        {
                            ...selection,
                            selected: false
                        }
                    )
            })
        })
    } 


    return (
        <div>
            <nav className={styles['filter-navigation']}>
                {props.selections.map((select, index) =>
                    <button
                        type='button' 
                        onClick={() => !(select.selected) ? updateSelection(index) : undefined}
                        className={`
                            ${styles['select-item']} 
                            ${select.color}
                            ${select.color ? styles['has-color'] : ''}
                            ${select.selected ? styles['selected'] : ''}
                        `} 
                        key={index}
                    >
                        <span className='material-icons'>{select.iconFont}</span>
                        <span>{select.text}</span>
                    </button>
                )}
            </nav>
        </div>
    )
}

export default FilterSelect