import { useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import SideBarButton from '../Buttons/SideBarButton/SideBarButton';
import SelectMenu, { SelectItem } from '../SelectMenu/SelectMenu';

const SideButtonMenu = (props: {
    buttonText: string,
    buttonIcon: string,
    menuTitle: string,
    startSelectItems: Array<SelectItem>,
    updateFunc: (updatedItems: Array<SelectItem>) => void,
    createResourceLocation?: string,
    createResourceName?: string
    resourcePlural: string
    isSelectOne?: boolean,
    color?: string,
    updateOnChange?: boolean,
    returnSelected?: boolean
}) => {
    const ref = useDetectClickOutside({ onTriggered: () => setShowMenu(false) });

    const [selectItems, setSelectItems] = useState<Array<SelectItem>>(props.startSelectItems);

    useEffect(() => {
        setSelectItems(props.startSelectItems);
    }, [props.startSelectItems]);

    useEffect(() => {
        props.updateOnChange && doUpdate();
    }, [selectItems]);

    const [showMenu, setShowMenu] = useState(false);

    const doUpdate = () => {
        props.updateFunc(selectItems.filter((currentItem, index) => 
            props.returnSelected ?
                currentItem.selected :
                currentItem.selected !== props.startSelectItems[index].selected
        ))
    }

    const saveSelection = () => {
        doUpdate();
        setShowMenu(false);
    }

    const cancelSelection = () => {
        setSelectItems(props.startSelectItems);
        setShowMenu(false);
    }

    return (
        <details open={showMenu} ref={ref} style={{ marginBottom: '8px'}}>
            <summary>
                <SideBarButton
                    text={props.buttonText}
                    iconFont={props.buttonIcon}
                    clickEvent={(e: any) => {
                        e.preventDefault();
                        setShowMenu(!showMenu)
                    }}
                    color={props.color}
                />
            </summary>
            <SelectMenu
                title={props.menuTitle}
                selectItems={selectItems}
                setSelectedItems={setSelectItems}
                updateFunc={saveSelection}
                cancelFunc={cancelSelection}
                createResourceLocation={props.createResourceLocation}
                createResourceName={props.createResourceName}
                resourcePlural={props.resourcePlural}
                isSelectOne={props.isSelectOne}
                updateOnChange={props.updateOnChange}
            />

        </details>
    )
}

export default SideButtonMenu