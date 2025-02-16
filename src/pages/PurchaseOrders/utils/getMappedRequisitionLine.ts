import { ProductResponseData } from "../../../types/products.types";
import findProduct from "../../../utils/findProduct";
import getAdjustedPrice from "../../Products/utils/getAdjustedPrice";
import getNettPrice from "../../Products/utils/getNettPrice";
import { ReceivePurchaseOrderLineData } from "../components/PurchaseOrderSideBar/PurchaseOrderActions/components/ReceivePurchaseOrderLinesList";

const getMappedRequisitionLine = (line: ReceivePurchaseOrderLineData, products: Array<ProductResponseData>) => {
    const product = findProduct(products, line.product_id);
    return {
        requisition_number: 0,
        quantity: parseInt(line.new_quantity_received),
        product_id: line.product_id,
        product_description: product ? product.data.description : '',
        nett_price: product ? getNettPrice(product.data.price, product.data.percentage_discount) : 0,
        adjusted_price: product ? getAdjustedPrice(product.data.price, product.data.percentage_markup) : 0,
        product_unit: product ? product.data.unit : '',
        catalogue_number: product ? product.data.catalogue_number : '',
        item_type: 0,   
    }
}

export default getMappedRequisitionLine