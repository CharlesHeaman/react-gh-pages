import { useEffect, useState } from "react";
import PaginationNavigation from "../../../../../components/ui/PaginationNavigation/PaginationNavigation"
import SearchTable from "../../../../../components/ui/SearchTable/SearchTable"
import { CustomerCollectionResponse, CustomerResponseData } from "../../../../../types/customers.types";
import { NonConformanceReportCollectionResponse } from "../../../../../types/nonConformanceReport.types";
import NonConformanceReportRow from "./NonConformanceReportRow";
import getAPI from "../../../../../utils/getAPI";
import findCustomer from "../../../../../utils/findCustomer";
import { SupplierManufacturerCollectionResponse, SupplierManufacturerResponseData } from "../../../../../types/supplierManufacturer.types";
import findSupplierManufacturer from "../../../../../utils/findSupplierManufacturer";
import NonConformanceReportRowSkeleton from "./NonConformanceReportRowSkeleton";

const NonConformanceReportList = (props: {
    isNonConformanceReportsLoading: boolean,
    nonConformanceReports: NonConformanceReportCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
}) => {
    // Data States
    const [isCustomersLoading, setIsCustomersLoading] = useState(false);
    const [customerData, setCustomersData] = useState<Array<CustomerResponseData>>([]);
    const [isSuppliersLoading, setIsSuppliersLoading] = useState(false);
    const [supplierData, setSupplierData] = useState<Array<SupplierManufacturerResponseData>>([]);
    
    // Resource Constants
    const resourceName = "non-conformance reports";
    const resourceIcon = "feedback";

    useEffect(() => {
        setIsCustomersLoading(true)
    }, [props.isNonConformanceReportsLoading])

    useEffect(() => {
        if (props.nonConformanceReports === undefined) return;
        // Customers
        const customerReports = props.nonConformanceReports.data.filter(report => report.data.type === 1);
        if (customerReports.length > 0) {
            getCustomers([...new Set(customerReports.map(contact => contact.data.customer_id))].filter(id => id !== null));
        } else {
            setIsCustomersLoading(false)
        }
        // Suppliers
        const supplierReports = props.nonConformanceReports.data.filter(report => report.data.type === 3);
        if (supplierReports.length > 0) {
            getSuppliers([...new Set(supplierReports.map(contact => contact.data.supplier_manufacturer_id))].filter(id => id !== null));
        } else {
            setIsSuppliersLoading(false);
        }
    }, [props.nonConformanceReports])

    const getCustomers = (customerIDs: Array<number>) => {
        getAPI('customers', {
            ids: customerIDs
        }, (response: any) => {
            const customerData: CustomerCollectionResponse = response.data;
            setCustomersData(customerData.data)
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

    const isLoading = (
        props.isNonConformanceReportsLoading ||
        isCustomersLoading ||
        isSuppliersLoading
    )

    const getTableHeader = () => {
        var tableHeader = ['Report Number', 'Source', 'Type', 'Concern & Cause Definition', 'Date', 'Status'];
        return tableHeader
    }

    return (
        <div>
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.nonConformanceReports)}
                skeletonRow={<NonConformanceReportRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.nonConformanceReports ? props.nonConformanceReports.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.nonConformanceReports && props.nonConformanceReports.data.map((nonConformanceReport, index) => 
                    <NonConformanceReportRow
                        nonConformanceReport={nonConformanceReport}
                        customer={nonConformanceReport.data.customer_id ? findCustomer(customerData, nonConformanceReport.data.customer_id) : undefined}
                        supplier={nonConformanceReport.data.supplier_manufacturer_id ? findSupplierManufacturer(supplierData, nonConformanceReport.data.supplier_manufacturer_id) : undefined}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.nonConformanceReports) && <PaginationNavigation
                data={props.nonConformanceReports.data}
                totalCount={props.nonConformanceReports.total_count}
                perPage={props.nonConformanceReports.pages.per_page}
                resourceName={resourceName}
                prefix="non_conformance_reports"    
            />}
        </div>
    )
}

export default NonConformanceReportList