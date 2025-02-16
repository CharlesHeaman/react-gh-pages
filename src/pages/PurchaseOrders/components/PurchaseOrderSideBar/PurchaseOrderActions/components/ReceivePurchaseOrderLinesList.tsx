
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchTable from "../../../../../../components/ui/SearchTable/SearchTable";
import { ProductCollectionResponse, ProductResponseData } from "../../../../../../types/products.types";
import { PurchaseOrderLineCollectionResponse } from "../../../../../../types/PurchaseOrderLines.types";
import findProduct from "../../../../../../utils/findProduct";
import getAPI from "../../../../../../utils/getAPI";
import PurchaseOrderLineRowSkeleton from "../../../PurchaseOrderLineRowSkeleton";
import ReceivePurchaseOrderLineRow from "../../../ReceivePurchaseOrderLineRow";

export interface ReceivePurchaseOrderLineData {
    line_id: number,
    quantity_ordered: number,
    product_id: number,
    product_description: string,
    catalogue_number: string,
    quantity_received: number,
    accounts_quantity_outstanding: number,
    new_quantity_received: string,
    product_price: number,
    invoiced_price: string,
    requisition_number: number | null,
}

const ReceivePurchaseOrderLinesList = (props: {
    isPurchaseOrderLinesLoading: boolean,
    purchaseOrderLines: PurchaseOrderLineCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    smallNoneFound?: boolean,
    purchaseOrderLinesReceiveData: Array<ReceivePurchaseOrderLineData>,
    setPurchaseOrderLinesReceiveData: Dispatch<SetStateAction<Array<ReceivePurchaseOrderLineData>>>,
    isPreview?: boolean,
    isReconcile?: boolean
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
            if (!props.isPreview) {
                const filteredList = !props.isReconcile ?
                    props.purchaseOrderLines.data.filter(line => line.data.status === 0) :
                    props.purchaseOrderLines.data.filter(line => line.data.accounts_quantity_outstanding > 0);
                props.setPurchaseOrderLinesReceiveData(filteredList.map(line => {
                    return {
                        line_id: line.id,
                        quantity_ordered: line.data.quantity_ordered,
                        product_id: line.data.product_id,
                        product_description: line.data.product_description,
                        catalogue_number: line.data.catalogue_number,
                        product_price: line.data.product_price,
                        invoiced_price: line.data.product_price.toString(),
                        quantity_received: line.data.quantity_received,
                        accounts_quantity_outstanding: line.data.accounts_quantity_outstanding,
                        requisition_number: line.data.requisition_number,
                        new_quantity_received: '0'
                    }
                }));
            }
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

    const updateOrderLine = (lineID: number, name: string, value: string) => {
        props.setPurchaseOrderLinesReceiveData(prevState => {
            return prevState.map(currentLine => {
                return (lineID === currentLine.line_id ? 
                        {
                            ...currentLine,
                            [name]: value
                        } :
                        currentLine
                    )
            })
        })
    }

    const getTableHeader = () => {
        var tableHeader = [!props.isReconcile ? 'Received' : 'Invoiced', 'Outstanding', ' Product', 'Catalogue Number', 'Description', 'Unit', 'Price'];
        return props.isReconcile ? tableHeader.concat(['Invoiced Price']) : tableHeader;
    }

    return (
        <>
            <h2>{!props.isReconcile ? 'Receive' : 'Invoice Reconcile'} Order Items</h2>
            <div className="table-wrapper">        
                <SearchTable
                    headers={getTableHeader()}
                    isLoading={!(!isLoading && props.purchaseOrderLines)}
                    skeletonRow={<PurchaseOrderLineRowSkeleton/>}
                    skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                    count={props.purchaseOrderLines ? props.purchaseOrderLines.data.length : 0}
                    resourceName={resourceName}
                    resourceIconFont={resourceIcon}
                    body={props.purchaseOrderLinesReceiveData.map((line, index) => 
                        <ReceivePurchaseOrderLineRow
                            purchaseOrderLine={line}
                            product={findProduct(productData, line.product_id)}
                            updateFunc={updateOrderLine}
                            isPreview={props.isPreview}
                            isReconcile={props.isReconcile}
                            key={index}
                        />
                    )}
                    smallNoneFound={props.smallNoneFound}
                />
            </div>
        </>
    )
}

export default ReceivePurchaseOrderLinesList