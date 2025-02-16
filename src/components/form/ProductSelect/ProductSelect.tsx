import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import { ProductResponseData, ProductCollectionResponse } from "../../../types/products.types";

const ProductSelect = (props: {
    selectedProduct: ProductResponseData | undefined,
    setSelectedProduct: Dispatch<SetStateAction<ProductResponseData | undefined>>,
    required?: boolean,
    customerID?: number,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isProductsLoading, setIsProductsLoading] = useState(false);
    const [productData, setProductsData] = useState<ProductCollectionResponse>();

    useEffect(() => {
        getProducts();
    }, [searchTerm, props.customerID])

    const getProducts = () => {
        getAPI('products', {
            description_like: searchTerm,
            is_active: true,
        }, (response: any) => {
            const productData: ProductCollectionResponse = response.data;
            setProductsData(productData);
        }, setIsProductsLoading);
    }

    const showRequired = props.selectedProduct === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="inventory_2"
                resourceName="product"
                resourceNamePlural="products"
                selectedText={props.selectedProduct?.data.description}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={productData ? productData.data.map(product => {
                    return {
                        text: product.data.description,
                        clickFunc: () => props.setSelectedProduct(product),
                        selected: props.selectedProduct?.id === product.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Product is required`}
                show={showRequired}
            />}
        </>
    )
}

export default ProductSelect