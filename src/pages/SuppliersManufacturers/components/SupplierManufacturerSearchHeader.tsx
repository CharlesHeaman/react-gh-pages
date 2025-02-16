import CreateButton from "../../../components/form/CreateButton/CreateButton";
import QueryFilterSelect from "../../../components/form/QueryFilterSelect/QueryFilterSelect";
import SearchForm from "../../../components/form/SearchForm/SearchForm";
import PermsProtectedComponent from "../../../components/PermsProtectedComponent";
import HeaderFlex from "../../../components/ui/HeaderFlex";

const SupplierManufacturerSearchHeader = () => {
    // Filters 
    const approvalFilterOptions = [
        {
            text: 'Approved',
            value: true,
            iconFont: 'done',
            selected: true
        },
        {
            text: 'Pending',
            value: 'null',
            iconFont: 'pending',
        },
        {
            text: 'Not Approved',
            value: false,
            iconFont: 'close',
        }
    ]

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
                placeHolder="Search by code or name..."
                prefix="suppliers_manufacturers"
            />
            <QueryFilterSelect
                selections={approvalFilterOptions}
                paramName="suppliers_manufacturers_is_approved"
            />
            <QueryFilterSelect
                selections={activeFilterOptions}
                paramName="suppliers_manufacturers_is_active"
            />
            <PermsProtectedComponent requiredPerms={{ stock: 2 }}>
                <CreateButton 
                    text={"Create Supplier/Manufacturer"} 
                    to={"suppliers_manufacturers/create"}
                />
            </PermsProtectedComponent>
        </HeaderFlex>
    )
}

export default SupplierManufacturerSearchHeader