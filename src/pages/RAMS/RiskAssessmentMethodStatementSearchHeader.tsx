import CreateButton from "../../components/form/CreateButton/CreateButton"
import SearchForm from "../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../components/ui/HeaderFlex"

const RiskAssessmentMethodStatementSearchHeader = () => {
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search all risk assessment method statements by file name..."
                    prefix="rams"
                />
                <CreateButton 
                    text={"Create RAMS"} 
                    to={`rams/create`}
                />
            </HeaderFlex>
        </>
    )
}

export default RiskAssessmentMethodStatementSearchHeader