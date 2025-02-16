import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const TemplateFooterSearchHeader = (props: {
    showCreate: () => void
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
    ]

    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search all template footers by name..."
                    prefix="template_footers"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="template_footers_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                    <ShowCreateButton 
                        text={"Create Template Footer"}
                        clickFunc={props.showCreate} 
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default TemplateFooterSearchHeader