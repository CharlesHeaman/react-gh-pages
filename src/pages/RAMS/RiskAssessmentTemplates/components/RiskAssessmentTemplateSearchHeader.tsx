import QueryFilterSelect from "../../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../../components/ui/HeaderFlex"

const RiskAssessmentTemplateSearchHeader = (props: {
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
                    placeHolder="Search risk assessment templates by name..."
                    prefix="risk_assessment_templates"
                />
                <QueryFilterSelect
                    selections={activeFilterOptions}
                    paramName="risk_assessment_templates_is_active"
                />
                <PermsProtectedComponent requiredPerms={{ templates: 2 }}>
                    <ShowCreateButton 
                        text={"Create Template"}
                        clickFunc={props.showCreate} 
                    />
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default RiskAssessmentTemplateSearchHeader