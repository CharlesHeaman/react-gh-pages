
import { useEffect, useState } from "react";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ProductCollectionResponse, ProductResponseData } from "../../../types/products.types";
import { RequisitionLineCollectionResponse } from "../../../types/requisitionLines.types";
import findProduct from "../../../utils/findProduct";
import formatMoney from "../../../utils/formatMoney";
import getAPI from "../../../utils/getAPI";
import reduceRequisitionLinesCost from "../utils/reduceRequisitionLinesCost";
import RequisitionLineRow from "./RequisitionLineRow";
import PurchaseOrderLineRowSkeleton from "../../PurchaseOrders/components/PurchaseOrderLineRowSkeleton";

const RequisitionedItemsList = (props: {
    isRequisitionLinesLoading: boolean,
    requisitionLines: RequisitionLineCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hideRequisition?: boolean,
    smallNoneFound?: boolean,
    noOutline?: boolean,
    hidePagination?: boolean,
}) => {
    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<Array<ProductResponseData>>([]);
        
    // Resource Constants
    const resourceName = "requisitioned items";
    const resourceIcon = "inventory_2";

    useEffect(() => {
        setIsProductsLoading(true);
    }, [props.isRequisitionLinesLoading]);

    useEffect(() => {
        if (props.requisitionLines && props.requisitionLines.data.length > 0) {
            getProducts([...new Set(props.requisitionLines.data.map(requisitionLine => requisitionLine.data.product_id))]);
        } else {
            setIsProductsLoading(false);
        }
    }, [props.requisitionLines]);


    const getProducts = (productIDs: Array<number | null>) => {
        getAPI('products', {
            ids: productIDs
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData.data)
        }, setIsProductsLoading)
    }

    const isLoading = (
        props.isRequisitionLinesLoading || 
        isProductsLoading
    )

    const totalCost = props.requisitionLines ? reduceRequisitionLinesCost(props.requisitionLines.data) : 0;

    const getTableHeader = () => {
        var tableHeader = ['Requisition', 'Quantity', 'Product', 'Catalogue Number', 'Description', 'Unit', 'Nett Price', 'Total'];
        if (props.hideRequisition) {
            var headerIndex = tableHeader.indexOf('Requisition');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        return tableHeader
    }

    return (
        <div>            
            <SearchTable
                headers={getTableHeader()}
                isLoading={!(!isLoading && props.requisitionLines)}
                skeletonRow={<PurchaseOrderLineRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.requisitionLines ? props.requisitionLines.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.requisitionLines && props.requisitionLines.data.map((line, index) => 
                    <RequisitionLineRow
                        requisitionLine={line}
                        product={findProduct(productData, line.data.product_id)}
                        hideRequisition={props.hideRequisition}
                        key={index}
                    />
                )}
                footer={<tr>
                    {!props.hideRequisition ? <td></td> : null}
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <th className="text-right">{formatMoney(totalCost)}</th>
                </tr>}
                smallNoneFound={props.smallNoneFound}
                noOutline={props.noOutline}
            />
            {!props.hidePagination && (!isLoading && props.requisitionLines) && <PaginationNavigation
                data={props.requisitionLines.data}
                totalCount={props.requisitionLines.total_count}
                perPage={props.requisitionLines.pages.per_page}
                resourceName={resourceName}
                prefix="requisition_lines"
            />}
        </div>
    )
}

export default RequisitionedItemsList