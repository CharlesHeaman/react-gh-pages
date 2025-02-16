import { useSearchParams } from "react-router-dom"
import CreateButton from "../../../components/form/CreateButton/CreateButton";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import ClearAdvancedSearchButton from "../../../components/ui/ClearAdvancedSearchButton/ClearAdvancedSearchButton";
import HeaderFlex from "../../../components/ui/HeaderFlex";
import getObjectHasValue from "../../../utils/getObjectHasValue";
import getProductAdvancedSearchParams from "../utils/getProductAdvancedSearchParams";
import clearProductAdvancedSearchParams from "../utils/clearProductAdvancedSearchParams";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";
import OrderBySelect from "../../../components/ui/PaginationNavigation/OrderBySelect";

const ProductSearchHeader = (props: {
    showAdvancedSearch?: () => void,
    supplierID?: number,
    hideFilters?: boolean,
    hideCreate?: boolean,
}) => {
    const [searchParams, setSearchParams] = useSearchParams();

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
    
    const sundryFilterOptions = [
        {
            text: 'Non-sundry',
            value: false,
            iconFont: 'lens',
            selected: true
        },
        {
            text: 'Include Sundry',
            value: undefined,
            iconFont: 'donut_small',
        }
    ];

    const stockFilterOptions = [
        {
            text: 'Stock',
            value: true,
            iconFont: 'inbox',
        },
        {
            text: 'All',
            value: undefined,
            iconFont: 'public',
            selected: true
        }
    ];

    // Order By
    const orderByOptions = [
        {
            text: 'Category Name',
            iconFont: 'inventory_2',
            value: 'category_name',
        },
        {
            text: 'Description',
            iconFont: 'notes',
            value: 'description',
            selected: true
        },
        {
            text: 'Size/Model',
            iconFont: 'straighten',
            value: 'size_or_model'
        },
        {
            text: 'Supplier Name',
            iconFont: 'warehouse',
            value: 'supplier_name'
        },
        {
            text: 'Catalogue Number',
            iconFont: 'menu_book',
            value: 'catalogue_number'
        },
        {
            text: 'List Price',
            iconFont: 'sell',
            value: 'price'
        }
    ];

    const advancedParams = getProductAdvancedSearchParams(searchParams);
    const hasAdvancedSearch = getObjectHasValue(advancedParams);
    
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    showAdvancedSearch={props.showAdvancedSearch}
                    placeHolder="Search products by description or catalogue number..."
                    prefix="products"
                    hasAdvancedSearch={hasAdvancedSearch}
                />
                {hasAdvancedSearch ? 
                    <ClearAdvancedSearchButton 
                        clearFunc={() => clearProductAdvancedSearchParams(searchParams, (searchParams) => setSearchParams(searchParams))}
                    /> : 
                    null
                }
                <OrderBySelect 
                    resourceName={'products'}
                    selections={orderByOptions}
                />
                {!props.hideFilters && <div style={{ display: 'flex', gap: 'var(--normal-gap)'}}>
                    <QueryFilterSelect 
                        paramName={"products_is_stock"} 
                        selections={stockFilterOptions}                        
                    />
                    <QueryFilterSelect 
                        paramName={"products_is_sundry"} 
                        selections={sundryFilterOptions}                        
                    />
                    <QueryFilterSelect 
                        paramName={"products_is_active"} 
                        selections={activeFilterOptions}                        
                    />
                </div>}
                <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                    {!props.hideCreate && <CreateButton 
                        text={"Create Product"} 
                        to={`products/create${props.supplierID ? `?supplier_id=${props.supplierID}` : ''}`}
                    />}
                </PermsProtectedComponent>
            </HeaderFlex>
        </>
    )
}

export default ProductSearchHeader