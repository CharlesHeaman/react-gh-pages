import { Dispatch, SetStateAction, useEffect, useState } from "react"
import SubmitButton from "../../../../components/form/SubmitButton/SubmitButton"
import GridItem from "../../../../components/ui/Containers/GridItem/GridItem"
import InfoGrid from "../../../../components/ui/Containers/InfoGrid/InfoGrid"
import InnerContainer from "../../../../components/ui/Containers/InnerContainer/InnerContainer"
import NoneFound from "../../../../components/ui/General/NoneFound/NoneFound"
import { ProductResponseData } from "../../../../types/products.types"
import { QuotedEquipmentResponseData } from "../../../../types/quotedEquipment.types"
import { QuoteLineResponseData } from "../../../../types/quoteLine.types"
import formatMoney from "../../../../utils/formatMoney"
import AddProductToList from "../../../PurchaseOrders/components/AddProductToList"
import EditQuoteMaterialsLineRow from "./EditQuoteMaterialsLineRow"
import putAPI from "../../../../utils/putAPI"
import reduceEditQuoteMaterialTotal from "../utils/reduceEditQuoteMaterialTotal"

export interface EditQuoteLineData {
    line_id: number,
    quote_id: number,
    equipment_id: number | null,
    site_id: number | null,
    is_equipment: boolean,
    quantity: string,
    category: number,
    description: string,
    supplier: string,
    price: string,
    markup: string,
}

const EditEquipmentQuoteMaterials = (props: {
    quotedEquipment: QuotedEquipmentResponseData,
    quoteLines: Array<QuoteLineResponseData>,
    setIsEditMode: Dispatch<SetStateAction<boolean>>,
    getQuoteLines: () => void,
}) => {
    // Edit States
    const [isUpdating, setIsUpdating] = useState(false);
    const [quoteLinesEditData, setQuoteLinesEditData] = useState<Array<EditQuoteLineData>>([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddRefrigerant, setShowAddRefrigerant] = useState(false);
    const [showAddExtra, setShowAddExtra] = useState(false);

    useEffect(() => {
        setQuoteLinesEditData(props.quoteLines.map(line => {
            return {
                line_id: line.id,
                quote_id: line.data.quote_id,
                equipment_id: line.data.equipment_id,
                site_id: line.data.site_id,
                is_equipment: line.data.is_equipment,
                quantity: line.data.quantity.toString(),
                category: line.data.category,
                description: line.data.description,
                supplier: line.data.supplier,
                price: line.data.price.toString(),
                markup: line.data.markup.toString(),
            }
        }));
    }, [props.quoteLines]);

    const addQuoteLine = (product: ProductResponseData, category: number) => {
        // Add New Line 
        setQuoteLinesEditData(prevState => [
            ...prevState,
            {
                line_id: new Date().getTime() * -1,
                quote_id: props.quotedEquipment.data.quote_id,
                equipment_id: props.quotedEquipment.data.equipment_id,
                site_id: null,
                is_equipment: false,
                quantity: '1',
                category: category,
                description: product.data.description,
                supplier: 'test',
                price: product.data.selling_price ? product.data.selling_price.toString() : product.data.price.toString(),
                markup: product.data.percentage_markup.toString(),
            }
        ]);
        // Hide Overlay 
        setShowAddProduct(false);
        setShowAddRefrigerant(false);
        setShowAddExtra(false);
    }

    const updateQuoteLine = (lineID: number, name: string, value: string) => {
        setQuoteLinesEditData(prevState => {
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

    const removeQuoteLine = (lineID: number) => {
        setQuoteLinesEditData(prevState => prevState.filter(line => line.line_id !== lineID));
    }

    const isLineUpdated = (originalLine: QuoteLineResponseData | undefined, currentLine: EditQuoteLineData): boolean => {
        return (
            originalLine?.data.quantity !== parseInt(currentLine.quantity) ||
            originalLine?.data.price !== parseFloat(currentLine.price) ||
            originalLine?.data.markup !== parseFloat(currentLine.markup) ||
            originalLine?.data.description !== currentLine.description ||
            originalLine?.data.supplier !== currentLine.supplier
        )
    }

    const updateQuoteLines = () => {
        // Sanitize Lines
        const sanitizedLines = quoteLinesEditData.map(editLine => {
            return {
                ...editLine,
                quantity: isNaN(parseInt(editLine.quantity)) ? '1' : editLine.quantity
            }
        })
        const startLineIDs = props.quoteLines.map(startLine => startLine.id);
        const editLineIDs = sanitizedLines.map(editLine => editLine.line_id);
        // Lines with IDs that don't exist within the original array
        const addedLines = sanitizedLines.filter(editLine => !(startLineIDs.includes(editLine.line_id)));
        // Lines with IDs in both arrays 
        const commonLines = sanitizedLines.filter(editLine => startLineIDs.includes(editLine.line_id));
        // Remove lines that are same as original 
        const updatedLines = commonLines.filter(editLine => isLineUpdated(props.quoteLines.find(startLine => startLine.id === editLine.line_id), editLine));
        // Lines with IDs that don't exist within the current array
        const removedLineIDs = startLineIDs.filter(startLineID => !(editLineIDs.includes(startLineID)));
        putAPI('quote_lines/update_collection', {}, {
            quote_id: props.quotedEquipment.data.quote_id,
            equipment_id: props.quotedEquipment.data.equipment_id,
            insertLines: addedLines,
            updateLines: updatedLines,
            removeLineIDs: removedLineIDs
        }, () => {
            props.getQuoteLines();
            props.setIsEditMode(false);
        }, setIsUpdating)
    }
    
    return (
        <>
            <section>
                <h2>Materials</h2>
                <InfoGrid>
                    <GridItem>
                        {quoteLinesEditData.length > 0 ? 
                            <div className="table-wrapper">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Type</th>
                                            <th>Quantity</th>
                                            <th>Supplier</th>
                                            <th>Description</th>
                                            <th>Rate</th>
                                            <th>Mark-up</th>
                                            <th>Sell</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {quoteLinesEditData.map((quoteLine, index) => <EditQuoteMaterialsLineRow
                                            quoteLine={quoteLine}
                                            updateFunc={updateQuoteLine}
                                            removeFunc={removeQuoteLine}
                                            key={index}
                                        />)}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <th className="text-right">{formatMoney(reduceEditQuoteMaterialTotal(quoteLinesEditData))}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div> : 
                            <InnerContainer>
                                <NoneFound 
                                    iconFont={"inventory_2"} 
                                    text={"No materials found"}
                                    small
                                />
                            </InnerContainer>
                        }
                    </GridItem>
                    <GridItem>
                        <div className="flex">
                            <div>
                                <SubmitButton
                                    text="Add Product"
                                    clickFunc={() => setShowAddProduct(true)}
                                    color="dark-blue"
                                    iconFont="inventory_2"
                                />   
                            </div>
                            <div>
                                <SubmitButton
                                    text="Add Refrigerant"
                                    clickFunc={() => setShowAddRefrigerant(true)}
                                    color="purple"
                                    iconFont="propane"
                                />   
                            </div>
                            <div>
                                <SubmitButton
                                    text="Add Extra"
                                    clickFunc={() => setShowAddExtra(true)}
                                    color="dark-purple"
                                    iconFont="add"
                                />   
                            </div>
                            <SubmitButton  
                                text="Save Changes"
                                clickFunc={updateQuoteLines}
                                color="light-green"
                                iconFont="save"
                                submitting={isUpdating}
                                submittingText="Updating.."
                            />
                        </div>
                    </GridItem>
                </InfoGrid>
            </section>

            <AddProductToList
                show={showAddProduct}
                hideFunc={() => setShowAddProduct(false)}
                addFunc={(product) => addQuoteLine(product, 1)}
                resourceName="Quote"
            />

            <AddProductToList
                show={showAddRefrigerant}
                hideFunc={() => setShowAddRefrigerant(false)}
                addFunc={(product) => addQuoteLine(product, 2)}
                resourceName="Quote"
            />

            <AddProductToList
                show={showAddExtra}
                hideFunc={() => setShowAddExtra(false)}
                addFunc={(product) => addQuoteLine(product, 3)}
                resourceName="Quote"
            />
        </>
    )
}

export default EditEquipmentQuoteMaterials