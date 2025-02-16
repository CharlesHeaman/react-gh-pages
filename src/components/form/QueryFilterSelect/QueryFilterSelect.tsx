import { useEffect, useState } from "react"
import FilterSelect, { FilterSelection } from "../../ui/FilterSelect/FilterSelect"
import { useSearchParams } from "react-router-dom";

const QueryFilterSelect = (props: {
    paramName: string,
    selections: Array<FilterSelection>,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getInitialValue = (): Array<FilterSelection> => {
        const propValue = props.selections.find(selection => selection.selected)?.value;
        const paramValue = searchParams.get(props.paramName);
        if (propValue?.toString() !== paramValue && paramValue !== null) {
            return props.selections.map(selection => {
                return (selection.value !== undefined && selection.value.toString() === paramValue ?
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
        }
        return props.selections;
    }

    const [selectOptions, setSelectOptions] = useState<Array<FilterSelection>>(getInitialValue());
    const targetValue = selectOptions.find(selection => selection.selected)?.value;
    const currentValue = searchParams.get(props.paramName);

    const updateParam = (value: string | undefined) => {
        value ? 
            searchParams.set(props.paramName, value) : 
            searchParams.delete(props.paramName);
        searchParams.delete('offset');
        searchParams.delete('perPage');
        setSearchParams(searchParams, { replace: true });
    }

    useEffect(() => {
        if (targetValue !== undefined) {
            if (targetValue.toString() !== currentValue) {
                updateParam(targetValue.toString())
            }
        } else {
            if (currentValue !== null) {
                updateParam(undefined);
            }
        }
    }, [targetValue]);

    return (
        <FilterSelect
            selections={selectOptions}
            selectionSetter={setSelectOptions}
        />
    )
}

export default QueryFilterSelect    