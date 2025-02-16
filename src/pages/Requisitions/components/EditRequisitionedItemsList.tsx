
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SubmitButton from "../../../components/form/SubmitButton/SubmitButton";
import GridItem from "../../../components/ui/Containers/GridItem/GridItem";
import InfoGrid from "../../../components/ui/Containers/InfoGrid/InfoGrid";
import SearchTable from "../../../components/ui/SearchTable/SearchTable";
import { ProductCollectionResponse, ProductResponseData } from "../../../types/products.types";
import { RequisitionLineCollectionResponse, RequisitionLineResponseData } from "../../../types/requisitionLines.types";
import findProduct from "../../../utils/findProduct";
import formatMoney from "../../../utils/formatMoney";
import getAPI from "../../../utils/getAPI";
import putAPI from "../../../utils/putAPI";
import AddProductToList from "../../PurchaseOrders/components/AddProductToList";
import PurchaseOrderLineRowSkeleton from "../../PurchaseOrders/components/PurchaseOrderLineRowSkeleton";
import reduceEditRequisitionLinesCost from "../utils/reduceEditRequisitionLinesCost";
import EditRequisitionLineRow from "./EditRequisitionLineRow";
import getNettPrice from "../../Products/utils/getNettPrice";
import getAdjustedPrice from "../../Products/utils/getAdjustedPrice";
import AddFreeTextToRequisition from "../../PurchaseOrders/components/AddFreeTextToRequisition";

export interface EditRequisitionLineData {
    requisition_number: number,
    line_id: number,
    quantity: string,
    product_id: number,
    product_description: string,
    catalogue_number: string,
    product_unit: string,
    nett_price: number,
    adjusted_price: number,
}

const EditRequisitionedItemsList = (props: {
    requisitionID: number,
    requisitionNumber: number,
    isRequisitionLinesLoading: boolean,
    requisitionLines: RequisitionLineCollectionResponse | undefined,
    perPage: number,
    totalCount?: number,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    setRequisitionLinesData: Dispatch<SetStateAction<RequisitionLineCollectionResponse | undefined>>
}) => {
    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductData] = useState<Array<ProductResponseData>>([]);

    // Edit States 
    const [isUpdating, setIsUpdating] = useState(false);
    const [requisitionLinesEditData, setRequisitionLinesEditData] = useState<Array<EditRequisitionLineData>>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddFreeText, setShowAddFreeText] = useState(false);

    // Resource Constants
    const resourceName = "requisitioned items";
    const resourceIcon = "inventory_2";

    useEffect(() => {
        setIsProductsLoading(true);
    }, [props.isRequisitionLinesLoading]);

    useEffect(() => {
        if (props.requisitionLines && props.requisitionLines.data.length > 0) {
            getProducts([...new Set(props.requisitionLines.data.map(requisitionLine => requisitionLine.data.product_id))]);
            setRequisitionLinesEditData(props.requisitionLines.data.map(line => {
                return {
                    requisition_number: line.data.requisition_number,
                    line_id: line.id,
                    quantity: line.data.quantity.toString(),
                    product_id: line.data.product_id,
                    product_description: line.data.product_description,
                    catalogue_number: line.data.catalogue_number,
                    nett_price: line.data.nett_price,
                    adjusted_price: line.data.adjusted_price,
                    product_unit: line.data.product_unit,
                }
            }));
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

    const totalCost = reduceEditRequisitionLinesCost(requisitionLinesEditData);

    const getTableHeader = () => {
        var tableHeader = ['Quantity', 'Product', 'Catalogue Number', 'Description', 'Unit', 'Nett Price', 'Total', ''];
        return tableHeader
    }

    const addOrderLine = (product: ProductResponseData) => {
        // Add New Line 
        setRequisitionLinesEditData(prevState => [
            ...prevState,
            {
                requisition_number: props.requisitionNumber,
                line_id: new Date().getTime() * -1,
                quantity: '1',
                product_id: product.id,
                product_description: product.data.description,
                catalogue_number: product.data.catalogue_number,
                nett_price: getNettPrice(product.data.price, product.data.percentage_discount),
                adjusted_price: getAdjustedPrice(product.data.price, product.data.percentage_markup), 
                product_unit: product.data.unit
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

    const addFreeText = (catalogueNumber: string, description: string, unit: string, price: string) => {
        // Add New Line 
        setRequisitionLinesEditData(prevState => [
            ...prevState,
            {
                requisition_number: props.requisitionNumber,
                line_id: new Date().getTime() * -1,
                quantity: '1',
                product_id: 0,
                product_description: description,
                catalogue_number: catalogueNumber,
                nett_price: parseFloat(price),
                adjusted_price: parseFloat(price),
                product_unit: unit
            }
        ]);
        // Hide Overlay 
        setShowAddFreeText(false);
    }

    const updateRequisitionLine = (lineID: number, name: string, value: string) => {
        setRequisitionLinesEditData(prevState => {
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

    const removeRequisitionLine = (lineID: number) => {
        setRequisitionLinesEditData(prevState => prevState.filter(line => line.line_id !== lineID));
    }

    const isLineUpdated = (originalLine: RequisitionLineResponseData | undefined, currentLine: EditRequisitionLineData): boolean => {
        return (
            originalLine?.data.quantity !== parseInt(currentLine.quantity) 
        )
    }

    const updateRequisitionLines = () => {
        // Sanitize Lines
        const sanitizedLines = requisitionLinesEditData.map(editLine => {
            return {
                ...editLine,
                quantity: isNaN(parseInt(editLine.quantity)) ? '1' : editLine.quantity
            }
        })
        const startLineIDs = props.requisitionLines ? props.requisitionLines.data.map(startLine => startLine.id) : [];
        const editLineIDs = sanitizedLines.map(editLine => editLine.line_id);
        // Lines with IDs that don't exist within the original array
        const addedLines = sanitizedLines.filter(editLine => !(startLineIDs.includes(editLine.line_id)));
        // Lines with IDs in both arrays 
        const commonLines = sanitizedLines.filter(editLine => startLineIDs.includes(editLine.line_id));
        // Remove lines that are same as original 
        const updatedLines = commonLines.filter(editLine => isLineUpdated(props.requisitionLines?.data.find(startLine => startLine.id === editLine.line_id), editLine));
        // Lines with IDs that don't exist within the current array
        const removedLineIDs = startLineIDs.filter(startLineID => !(editLineIDs.includes(startLineID)));
        putAPI('requisition_lines/update_collection', {}, {
            requisition_id: props.requisitionID,
            requisition_number: props.requisitionNumber,
            insertLines: addedLines,
            updateLines: updatedLines,
            removeLineIDs: removedLineIDs
        }, (response: any) => {
            const requisitionLinesData: RequisitionLineCollectionResponse = response.data;
            props.setRequisitionLinesData(requisitionLinesData)
            props.setIsEditMode(false);
        }, setIsUpdating)
    }

    return (
        <>          
            <InfoGrid>    
                <GridItem>  
                    <SearchTable
                        headers={getTableHeader()}
                        isLoading={!(!isLoading && props.requisitionLines)}
                        skeletonRow={<PurchaseOrderLineRowSkeleton/>}
                        skeletonCount={Math.min(props.perPage, props.totalCount ? props.totalCount : Infinity)}
                        count={requisitionLinesEditData.length}
                        resourceName={resourceName}
                        resourceIconFont={resourceIcon}
                        body={requisitionLinesEditData.map((line, index) => 
                            <EditRequisitionLineRow
                                requisitionLine={line}
                                product={findProduct(productData, line.product_id)}
                                updateFunc={updateRequisitionLine}
                                removeFunc={removeRequisitionLine}
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
                        smallNoneFound
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
                        <div>
                            <SubmitButton
                                text="Add Free Text"
                                clickFunc={() => setShowAddFreeText(true)}
                                color="orange"
                                iconFont="edit_note"
                                left
                            />    
                        </div>

                        <SubmitButton  
                            text="Save Changes"
                            clickFunc={updateRequisitionLines}
                            color="light-green"
                            iconFont="save"
                            submitting={isUpdating}
                            submittingText="Updating.."
                        />
                    </div>
                </GridItem>
            </InfoGrid>

            <AddProductToList
                show={showAddProduct}
                hideFunc={() => setShowAddProduct(false)}
                addFunc={addOrderLine}
                resourceName="Requisition"
            />

            <AddFreeTextToRequisition
                show={showAddFreeText}
                hideFunc={() => setShowAddFreeText(false)}
                addFunc={addFreeText}
            />
        </>
    )
}

export default EditRequisitionedItemsList