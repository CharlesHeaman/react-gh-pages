import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect";
import ShowCreateButton from "../../../../components/form/ShowCreateButton/ShowCreateButton";
import HeaderFlex from "../../../../components/ui/HeaderFlex";

const DocumentSearchHeader = (props: {
    resourcePrefix: string,
    showUpload: () => void
}) => {
    // Filters
    const activeFilterOptions = [
        {
            text: 'Active',
            value: true,
            iconFont: 'check_circle',
            selected: true
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
        }
    ];
    
    return (
        <HeaderFlex>
            <QueryFilterSelect
                selections={activeFilterOptions}
                paramName={`${props.resourcePrefix}_documents_is_active`}
            />
            <ShowCreateButton
                text="Upload Document"
                clickFunc={props.showUpload}
                iconFont="upload"
            />
        </HeaderFlex>
    )
}

export default DocumentSearchHeader