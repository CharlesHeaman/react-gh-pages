import { Dispatch, ReactNode, SetStateAction } from "react"
import SubmitButton from "../../form/SubmitButton/SubmitButton"
import ListItem from "../Containers/ListItem/ListItem"
import NoneFound from "../General/NoneFound/NoneFound"
import styles from "./SelectMenu.module.css"

export interface SelectItem {
    id: number,
    selected: boolean,
    display: ReactNode
}

const SelectMenu = (props: {
    title: string,
    selectItems: Array<SelectItem>,
    setSelectedItems: Dispatch<SetStateAction<SelectItem[]>>,
    updateFunc: () => void,
    cancelFunc: () => void,
    createResourceLocation?: string,
    createResourceName?: string,
    resourcePlural: string,
    isSelectOne?: boolean,
    updateOnChange?: boolean
}) => {
    
    const updateSelection = (id: number) => {
        props.setSelectedItems(prevState => 
            prevState.map(selectItem => {
                if (id === selectItem.id) {
                    return {
                        ...selectItem,
                        selected: !selectItem.selected
                    }
                }
                return selectItem
            })
        )
    }

    const updateSelectOne = (id: number) => {
        props.setSelectedItems(prevState => 
            prevState.map(selectItem => {
                if (id === selectItem.id) {
                    return {
                        ...selectItem,
                        selected: true
                    }
                }
                return {
                    ...selectItem,
                    selected: false
                }
            })
        )
    }

    const selectedCount = props.selectItems.filter(item => item.selected).length;

    return (
        <div style={{ maxWidth: '500px' }} className={styles["details-menu"]}>
            <div className={styles["details-menu-head"]}>
                <h3>{props.title}</h3>
            </div>
            <div className={styles["details-menu-body"]}>
                {props.selectItems.length > 0 ? 
                    props.selectItems.map((selectItem, index) => 
                        <ListItem 
                            clickFunc={() => props.isSelectOne ? updateSelectOne(selectItem.id) : updateSelection(selectItem.id)}
                            key={index}
                        >
                            <input type='checkbox' checked={selectItem.selected}/>
                            {selectItem.display}
                        </ListItem>
                    ) : 
                    <NoneFound 
                        iconFont={"edit"} 
                        text={`No ${props.resourcePlural} found.`}   
                        createTo={props.createResourceLocation}
                        createText={`Create ${props.createResourceName}`}
                        small                 
                    />
                }
            </div>
            {props.selectItems.length > 0 && !props.updateOnChange && <div className={styles["details-menu-foot"]}>
                <SubmitButton 
                    text='Cancel' 
                    color="grey"
                    clickFunc={props.cancelFunc}
                    noMargin
                />
                <SubmitButton 
                    text='Save'
                    clickFunc={props.updateFunc}
                    disabled={props.isSelectOne && (selectedCount !== 1)}
                    noMargin
                />
            </div>}
        </div>
    )
}

export default SelectMenu