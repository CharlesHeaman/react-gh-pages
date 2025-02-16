
import { useEffect, useState } from "react";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ProductCollectionResponse, ProductResponseData } from "../../../types/products.types";
import { PurchaseOrderLineCollectionResponse } from "../../../types/PurchaseOrderLines.types";
import findProduct from "../../../utils/findProduct";
import formatMoney from "../../../utils/formatMoney";
import getAPI from "../../../utils/getAPI";
import reducePurchaseOrderLinesCost from "../utils/reducePurchaseOrderLinesCost";
import PurchaseOrderLineRow from "./PurchaseOrderLineRow";
import PurchaseOrderLineRowSkeleton from "./PurchaseOrderLineRowSkeleton";
import PaginationNavigation from "../../../components/ui/PaginationNavigation/PaginationNavigation";

const PurchaseOrderLinesList = (props: {
    isPurchaseOrderLinesLoading: boolean,
    purchaseOrderLines: PurchaseOrderLineCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    hidePurchaseOrder?: boolean,
    smallNoneFound?: boolean,
    noOutline?: boolean,
    isSent?: boolean,
}) => {
    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<Array<ProductResponseData>>([]);

    // Resource Constants
    const resourceName = "purchase order items";
    const resourceIcon = "inventory_2";

    useEffect(() => {
        setIsProductsLoading(true);
    }, [props.isPurchaseOrderLinesLoading]);

    useEffect(() => {
        if (props.purchaseOrderLines && props.purchaseOrderLines.data.length > 0) {
            getProducts([...new Set(props.purchaseOrderLines.data.map(PurchaseOrderLine => PurchaseOrderLine.data.product_id))]);
        } else {
            setIsProductsLoading(false);
        }
    }, [props.purchaseOrderLines]);


    const getProducts = (productIDs: Array<number | null>) => {
        getAPI('products', {
            ids: productIDs
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductData(productData.data)
        }, setIsProductsLoading)
    }

    const isLoading = (
        props.isPurchaseOrderLinesLoading || 
        isProductsLoading
    )

    const totalCost = props.purchaseOrderLines ? reducePurchaseOrderLinesCost(props.purchaseOrderLines.data) : 0;

    const getTableHeader = () => {
        var tableHeader = ['Purchase Order', 'Received', 'Invoice Reconciled', props.isSent ? 'Ordered' : 'Quantity', 'Requisition', ' Product', 'Catalogue Number', 'Description', 'Unit', 'Nett Price', 'Total'];
        if (props.hidePurchaseOrder) {
            var headerIndex = tableHeader.indexOf('Purchase Order');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
        }
        if (!props.isSent) {
            var headerIndex = tableHeader.indexOf('Requisition');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            var headerIndex = tableHeader.indexOf('Received');
            if (headerIndex !== -1) {
                tableHeader.splice(headerIndex, 1);
            }
            var headerIndex = tableHeader.indexOf('Invoice Reconciled');
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
                isLoading={!(!isLoading && props.purchaseOrderLines)}
                skeletonRow={<PurchaseOrderLineRowSkeleton/>}
                skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                count={props.purchaseOrderLines ? props.purchaseOrderLines.data.length : 0}
                resourceName={resourceName}
                resourceIconFont={resourceIcon}
                body={props.purchaseOrderLines && props.purchaseOrderLines.data.map((line, index) => 
                    <PurchaseOrderLineRow
                        purchaseOrderLine={line}
                        product={findProduct(productData, line.data.product_id)}
                        hidePurchaseOrder={props.hidePurchaseOrder}
                        isSent={props.isSent}
                        key={index}
                    />
                )}
                footer={<tr>
                    {!props.hidePurchaseOrder ? <td></td> : null}
                    {props.isSent && <>
                        <td></td>
                        <td></td>
                        <td></td>
                    </>}
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
            {(!isLoading && props.purchaseOrderLines) && <PaginationNavigation
                data={props.purchaseOrderLines.data}
                totalCount={props.purchaseOrderLines.total_count}
                perPage={props.purchaseOrderLines.pages.per_page}
                resourceName={resourceName}
                prefix="purchase_order_lines"
            />}
        </div>
    )
}

export default PurchaseOrderLinesList