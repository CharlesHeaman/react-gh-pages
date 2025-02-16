import { useSearchParams } from "react-router-dom";
import NewSelectMenu, { NewSelectItem } from "../../form/NewSelectMenu/NewSelectMenu";
import { useEffect, useState } from "react";

export interface OrderByOption {
    text: string,
    iconFont: string,
    value: string,
    selected?: boolean
}

const OrderBySelect = (props: {
    resourceName: string,
    selections: Array<OrderByOption>,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getInitialValue = (): Array<NewSelectItem> => {    
        const selectItems: Array<NewSelectItem> = [];

        props.selections.forEach((selection, _) => {
            selectItems.push({
                icon: <span className="material-icons">{selection.iconFont}</span>,
                text: selection.text,
                clickFunc: () => {
                    setSelectOptions(selectOptions.map(option => {
                        return {
                            ...option,
                            selected: option.text === selection.text
                        }
                    }),
                )},
                selected: selection.selected ? true : false
            })
        });
        return selectItems;
    }

    // States 
    const [ascending, setAscending] = useState(true);
    const [selectOptions, setSelectOptions] = useState<Array<NewSelectItem>>(getInitialValue());

    // Order
    const targetOrderOption = selectOptions.find(selection => selection.selected);
    const targetOrderValue = props.selections.find(selection => selection.text === targetOrderOption?.text)?.value;
    const currentOrderValue = searchParams.get(props.resourceName);

    const updateParam = (value: string | undefined, paramName: string) => {
        value ? 
            searchParams.set(`${props.resourceName}_${paramName}`, value) : 
            searchParams.delete(`${props.resourceName}_${paramName}`);
        searchParams.delete('offset');
        searchParams.delete('perPage');
        setSearchParams(searchParams, { replace: true });
    }

    // Update Order
    useEffect(() => {
        if (targetOrderValue !== undefined) {
            if (targetOrderValue.toString() !== currentOrderValue) {
                updateParam(targetOrderValue.toString(), 'order_by');
            }
        } else {
            if (currentOrderValue !== null) {
                updateParam(undefined, 'order_by');;
            }
        }
    }, [targetOrderValue]);

    // Update Direction
    useEffect(() => {
        updateParam(ascending ? 'true' : 'false', 'ascending');
    }, [ascending]);

    return (
        <div style={{ display: 'flex' }}>
            <NewSelectMenu
                iconFont={ascending ? <div style={{ transform: 'scale(1, -1)' }}>sort</div> : 'sort'}
                selectedText={targetOrderOption?.text}
                selectItems={selectOptions}
                secondarySelectItems={[
                    {
                        icon: <span className="material-icons"><div style={{ transform: 'scale(1, -1)' }}>sort</div></span>,
                        text: 'Ascending',
                        clickFunc: () => setAscending(true),
                        selected: ascending
                    },
                    {
                        icon: <span className="material-icons">sort</span>,
                        text: 'Descending',
                        clickFunc: () => setAscending(false),
                        selected: !ascending
                    }
                ]}
                minWidth={50}
            />
        </div>
    )
}

export default OrderBySelect