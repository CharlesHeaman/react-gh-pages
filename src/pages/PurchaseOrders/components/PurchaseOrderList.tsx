import { useEffect, useState } from "react"
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../components/ui/SearchTable/SearchTable"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../types/customers.types"
import { PurchaseOrderCollectionResponse } from "../../../types/purchaseOrder.types"
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../types/supplierManufacturer.types"
import { UserCollectionResponse, UserResponseData } from "../../../types/user.types"
import findCustomer from "../../../utils/findCustomer"
import findSupplierManufacturer from "../../../utils/findSupplierManufacturer"
import findUser from "../../../utils/findUser"
import getAPI from "../../../utils/getAPI"
import PurchaseOrderRow from "../PurchaseOrderRow"
import PurchaseOrderRowSkeleton from "./PurchaseOrderRowSkeleton"
import { CostCentreCollectionResponse, CostCentreResponseData } from "../../../types/costCentres.types"
import findCostCentre from "../../../utils/findCostCentre"
import SearchHelperText from "../../../components/ui/SearchHelperText/SearchHelperText"

const PurchaseOrderList = (props: {
    hasSearched: boolean,
    isPurchaseOrdersLoading: boolean,
    purchaseOrders: PurchaseOrderCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideSupplier?: boolean,
    hideType?: boolean,
    hideCustomer?: boolean,
    showAdvancedSearch?: () => void
}) => {
    // Data States
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersData, setUsersData] = useState<Array<UserResponseData>>([]);
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomerData] = useState<Array<CustomerResponseData>>([]);
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<Array<SupplierManufacturerResponseData>>([]);
    const [isCostCentresLoading, setIsCostCentresLoading] = useState(false);
    const [costCentreData, setCostCentreData] = useState<Array<CostCentreResponseData>>([]);

    // Resource Constants
    const resourceName = "purchase orders";
    const resourceIcon = "receipt_long";

    useEffect(() => {
        setIsUsersLoading(true);
        !props.hideCustomer && setIsCustomersLoading(true);
        !props.hideSupplier && setIsSuppliersLoading(true);
        !props.hideType && setIsCostCentresLoading(true);

    }, [props.isPurchaseOrdersLoading])

    useEffect(() => {
        if (props.purchaseOrders && props.purchaseOrders.data.length > 0) {
            getUsers([...new Set(props.purchaseOrders.data.map(purchaseOrder => purchaseOrder.data.created_by_id))]);
            !props.hideCustomer && getCustomers([...new Set(props.purchaseOrders.data.map(purchaseOrder => purchaseOrder.data.assigned_customer_id))]);
            !props.hideSupplier && getSuppliers([...new Set(props.purchaseOrders.data.map(purchaseOrder => purchaseOrder.data.supplier_id))]);
            !props.hideType && getCostCentres([...new Set(props.purchaseOrders.data.map(purchaseOrder => purchaseOrder.data.cost_centre_id))]);

        } else {
            setIsUsersLoading(false);
            !props.hideCustomer && setIsCustomersLoading(false);
            !props.hideSupplier && setIsSuppliersLoading(false);
            !props.hideType && setIsCostCentresLoading(false);
        }
    }, [props.purchaseOrders])

    const getUsers = (userIDs: Array<number>) => {
        getAPI('users', {
            ids: userIDs
        }, (response: any) => {
            const userData: UserCollectionResponse = response.data;
            setUsersData(userData.data)
        }, setIsUsersLoading)
    }

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomerData(customerData.data)
        }, setIsCustomersLoading)
    }

    const getSuppliers = (supplierIDs: Array<number>) => {
        getAPI('suppliers_manufacturers', {
            ids: supplierIDs
        }, (response: any) => {
            const supplierData: SupplierManufacturerCollectionResponse = response.data;
            setSupplierData(supplierData.data)
        }, setIsSuppliersLoading)
    }

    const getCostCentres = (costCentreIDs: Array<number>) => {
        getAPI('cost_centres', {
            ids: costCentreIDs,
        }, (response: any) => {
            const costCentreData: CostCentreCollectionResponse = response.data;
            setCostCentreData(costCentreData.data)
        }, setIsCostCentresLoading)
    }

    const isLoading = (
        props.isPurchaseOrdersLoading || 
        isUsersLoading ||
        isCustomersLoading || 
        isSuppliersLoading || 
        isCostCentresLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Number', 'Type', 'Originator', 'Supplier', 'Customer', 'Date', 'Status'];
        if (props.hideSupplier) {
            var headerIndex = tableHeader.indexOf('Supplier');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideType) {
            var headerIndex = tableHeader.indexOf('Type');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (props.hideCustomer) {
            var headerIndex = tableHeader.indexOf('Customer');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }


    return (
        <>
            {props.hasSearched ?
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.purchaseOrders)}
                    skeletonRow={<PurchaseOrderRowSkeleton hideSupplier={props.hideSupplier} hideType={props.hideType} hideCustomer={props.hideCustomer}/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.purchaseOrders ? props.purchaseOrders.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.purchaseOrders && props.purchaseOrders.data.map((purchaseOrder, index) => 
                        <PurchaseOrderRow
                            purchaseOrder={purchaseOrder}
                            customer={findCustomer(customerData, purchaseOrder.data.assigned_customer_id)}
                            supplier={findSupplierManufacturer(supplierData, purchaseOrder.data.supplier_id)}
                            user={findUser(usersData, purchaseOrder.data.created_by_id)}
                            costCentre={findCostCentre(costCentreData, purchaseOrder.data.cost_centre_id)}
                            hideSupplier={props.hideSupplier}
                            hideType={props.hideType}
                            hideCustomer={props.hideCustomer}
                            key={index}
                        />
                    )}
                />
                :
                <SearchHelperText
                    iconFont={resourceIcon}
                    text="Search purchase orders by number"
                />
            }
            {(!isLoading && props.hasSearched && props.purchaseOrders) && <PaginationNavigation
                data={props.purchaseOrders.data}
                totalCount={props.purchaseOrders.total_count}
                perPage={props.purchaseOrders.pages.per_page}
                resourceName={resourceName} 
                prefix={"purchase_orders"}            
            />}
        </>
    )
}

export default PurchaseOrderList