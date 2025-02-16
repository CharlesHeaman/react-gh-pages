
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ProductCollectionResponse, ProductResponseData } from "../../../types/products.types";
import { PurchaseOrderLineCollectionResponse, PurchaseOrderLineResponseData } from "../../../types/PurchaseOrderLines.types";
import findProduct from "../../../utils/findProduct";
import formatMoney from "../../../utils/formatMoney";
import getAPI from "../../../utils/getAPI";
import putAPI from "../../../utils/putAPI";
import reduceEditPurchaseOrderLinesCost from "../utils/rerduceEditPurchaseOrderLine";
import AddProductToList from "./AddProductToList";
import EditPurchaseOrderLineRow from "./EditPurchaseOrderLineRow";
import PurchaseOrderLineRowSkeleton from "./PurchaseOrderLineRowSkeleton";

export interface EditPurchaseOrderLineData {
    line_id: number,
    quantity_ordered: string,
    product_id: number,
    product_description: string,
    catalogue_number: string,
    product_price: string,
}

const EditPurchaseOrderLinesList = (props: {
    purchaseOrderID: number,
    isPurchaseOrderLinesLoading: boolean,
    purchaseOrderLines: PurchaseOrderLineCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    smallNoneFound?: boolean,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setPurchaseOrderLines: Dispatch<SetStateAction<PurchaseOrderLineCollectionResponse | undefined>>
}) => {
    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<Array<ProductResponseData>>([]);

    // Edit States 
    const [isUpdating, setIsUpdating] = useState(false);
    const [purchaseOrderLinesEditData, setPurchaseOrderLinesEditData] = useState<Array<EditPurchaseOrderLineData>>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddFreeText, setShowAddFreeText] = useState(false);
    
    // Resource Constants
    const resourceName = "purchase order items";
    const resourceIcon = "inventory_2";

    useEffect(() => {
        setIsProductsLoading(true);
    }, [props.isPurchaseOrderLinesLoading]);

    useEffect(() => {
        if (props.purchaseOrderLines && props.purchaseOrderLines.data.length > 0) {
            getProducts([...new Set(props.purchaseOrderLines.data.map(PurchaseOrderLine => PurchaseOrderLine.data.product_id))]);
            setPurchaseOrderLinesEditData(props.purchaseOrderLines.data.map(line => {
                return {
                    line_id: line.id,
                    quantity_ordered: line.data.quantity_ordered.toString(),
                    product_id: line.data.product_id,
                    product_description: line.data.product_description,
                    catalogue_number: line.data.catalogue_number,
                    product_price: line.data.product_price.toString(),
                }
            }));
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

    const totalCost = reduceEditPurchaseOrderLinesCost(purchaseOrderLinesEditData);

    const addOrderLine = (product: ProductResponseData) => {
        const discountedPrice = product.data.price - (product.data.price * (product.data.percentage_discount / 100));
        // Add New Line 
        setPurchaseOrderLinesEditData(prevState => [
            ...prevState,
            {
                line_id: new Date().getTime() * -1,
                quantity_ordered: '1',
                product_id: product.id,
                product_description: product.data.description,
                catalogue_number: product.data.catalogue_number,
                product_price: discountedPrice.toString(),
            }
        ]);
        // Add New Product 
        setProductData(prevState => [
            ...prevState,
            product
        ])
        // Hide Overlay 
        setShowAddProduct(false);
    }

    const updateOrderLine = (lineID: number, name: string, value: string) => {
        setPurchaseOrderLinesEditData(prevState => {
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

    const removeOrderLine = (lineID: number) => {
        setPurchaseOrderLinesEditData(prevState => prevState.filter(line => line.line_id !== lineID));
    }

    const isLineUpdated = (originalLine: PurchaseOrderLineResponseData | undefined, currentLine: EditPurchaseOrderLineData): boolean => {
        return (
            originalLine?.data.quantity_ordered !== parseInt(currentLine.quantity_ordered) || 
            originalLine?.data.product_price !== parseFloat(currentLine.product_price) 
        )
    }

    const updatePurchaseOrderLines = () => {
        // Sanitize Lines
        const sanitizedLines = purchaseOrderLinesEditData.map(editLine => {
            return {
                ...editLine,
                quantity_ordered: isNaN(parseInt(editLine.quantity_ordered)) ? '1' : editLine.quantity_ordered,
                product_price: isNaN(parseFloat(editLine.product_price)) ? '0' : editLine.product_price,
            }
        })
        const startLineIDs = props.purchaseOrderLines ? props.purchaseOrderLines.data.map(startLine => startLine.id) : [];
        const editLineIDs = sanitizedLines.map(editLine => editLine.line_id);
        // Lines with IDs that don't exist within the original array
        const addedLines = sanitizedLines.filter(editLine => !(startLineIDs.includes(editLine.line_id)));
        // Lines with IDs in both arrays 
        const commonLines = sanitizedLines.filter(editLine => startLineIDs.includes(editLine.line_id));
        // Remove lines that are same as original 
        const updatedLines = commonLines.filter(editLine => isLineUpdated(props.purchaseOrderLines?.data.find(startLine => startLine.id === editLine.line_id), editLine));
        // Lines with IDs that don't exist within the current array
        const removedLineIDs = startLineIDs.filter(startLineID => !(editLineIDs.includes(startLineID)));
        putAPI('purchase_order_lines/update_collection', {}, {
            purchase_order_id: props.purchaseOrderID,
            insertLines: addedLines,
            updateLines: updatedLines,
            removeLineIDs: removedLineIDs
        }, (response: any) => {
            const purchaseOrderLinesData: PurchaseOrderLineCollectionResponse = response.data;
            props.setPurchaseOrderLines(purchaseOrderLinesData)
            props.setIsEditMode(false);
        }, setIsUpdating)
    }

    return (
        <>
            <InfoGrid>    
                <GridItem>
                    <SearchTable
                        headers={['Quantity', ' Product', 'Catalogue Number', 'Description', 'Unit', 'Nett Price', 'Total', '']}
                        isLoading={!(!isLoading && props.purchaseOrderLines)}
                        skeletonRow={<PurchaseOrderLineRowSkeleton/>}
                        skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                        count={purchaseOrderLinesEditData.length}
                        resourceName={resourceName}
                        resourceIconFont={resourceIcon}
                        body={purchaseOrderLinesEditData.map((line, index) => 
                            <EditPurchaseOrderLineRow
                                purchaseOrderLine={line}
                                product={findProduct(productData, line.product_id)}
                                updateFunc={updateOrderLine}
                                removeFunc={removeOrderLine}
                                key={index}
                            />
                        )}
                        footer={<tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th className="text-right">{formatMoney(totalCost)}</th>
                            <td></td>
                        </tr>}
                        smallNoneFound={props.smallNoneFound}
                        noOutline
                    />
                </GridItem>
                <GridItem>
                    <div className="flex">
                        <div>
                            <SubmitButton
                                text="Add Product"
                                clickFunc={() => setShowAddProduct(true)}
                                color="dark-blue"
                                iconFont="add"
                            />    
                        </div>
                        <SubmitButton  
                            text="Save Changes"
                            clickFunc={updatePurchaseOrderLines}
                            color="light-green"
                            iconFont="save"
                            submitting={isUpdating}
                            submittingText="Updating..."
                        />
                    </div>
                </GridItem>
            </InfoGrid>

            <AddProductToList
                show={showAddProduct}
                hideFunc={() => setShowAddProduct(false)}
                addFunc={addOrderLine}
                resourceName="Purchase Order"
            />
        </>
    )
}

export default EditPurchaseOrderLinesList