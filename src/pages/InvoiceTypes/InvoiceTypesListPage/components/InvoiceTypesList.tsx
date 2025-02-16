import PaginationNavigation from "../../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../../components/ui/SearchTable/SearchTable";
import { InvoiceTypeCollectionResponse } from "../../../../types/invoiceTypes.types";
import InvoiceTypeRow from "./InvoiceTypesRow";
import InvoiceTypeRowSkeleton from "./InvoiceTypesRowSkeleton";

const InvoiceTypesList = (props: {
    isInvoiceTypesLoading: boolean,
    invoiceTypeData: InvoiceTypeCollectionResponse | undefined,
    perPage: number,
}) => {
    // Resource Constants
    const resourceName = 'invoice types';
    const resourceIcon = 'credit_card';    

    const isLoading = (
        props.isInvoiceTypesLoading
    )

    return (
        <div>
            <SearchTable
                headers={['Name', 'Rate Type', 'Labour', 'Expenses', 'Mileage', 'Materials', 'Subcontract', 'Hire']}
                isLoading={!(!isLoading && props.invoiceTypeData)}
                skeletonRow={<InvoiceTypeRowSkeleton/>}
                skeletonCount={props.perPage}
                count={props.invoiceTypeData ? props.invoiceTypeData.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.invoiceTypeData && props.invoiceTypeData.data.map((invoiceType, index) => 
                    <InvoiceTypeRow
                        invoiceType={invoiceType}
                        key={index}
                    />
                )}
            />
            {(!isLoading && props.invoiceTypeData) && <PaginationNavigation
                data={props.invoiceTypeData.data}
                totalCount={props.invoiceTypeData.total_count}
                perPage={props.invoiceTypeData.pages.per_page}
                resourceName={resourceName}
                prefix="invoice_types"
            />}
        </div>
    )
}

export default InvoiceTypesList 