import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect"
import SearchForm from "../../../components/form/SearchForm/SearchForm"
import ShowCreateButton from "../../../components/form/ShowCreateButton/ShowCreateButton"
import PermsProtectedComponent from "../../../components/PermsProtectedComponent"
import HeaderFlex from "../../../components/ui/HeaderFlex"

const ProductCategorySearchHeader = (props: {
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
        <HeaderFlex>
            <SearchForm
                placeHolder="Search product categories by name..."
                prefix="product_category"
            />
            <QueryFilterSelect
                paramName="product_category_is_active" 
                selections={activeFilterOptions}                            
            />
            <PermsProtectedComponent requiredPerms={{ system: 2 }}>
                <ShowCreateButton
                    text="Create Product Category"
                    clickFunc={props.showCreate}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default ProductCategorySearchHeader