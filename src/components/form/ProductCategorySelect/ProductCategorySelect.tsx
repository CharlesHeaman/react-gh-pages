import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import getAPI from "../../../utils/getAPI";
import NewSelectMenu from "../NewSelectMenu/NewSelectMenu";
import FormErrorMessage from "../FormErrorMessage/FormErrorMessage";
import { ProductCategoryResponseData, ProductCategoryCollectionResponse } from "../../../types/productCategory.types";

const ProductCategorySelect = (props: {
    selectedProductCategory: ProductCategoryResponseData | undefined,
    setSelectedProductCategory: Dispatch<SetStateAction<ProductCategoryResponseData | undefined>>,
    setSelectedProductCategoryID?: (departmentID: number) => void,
    required?: boolean,
    hasSubmitted: boolean
}) => {

    // Search States
    const [searchTerm, setSearchTerm] = useState('');

    // Data States
    const [isProductCategoriesLoading, setIsProductCategoriesLoading] = useState(false);
    const [departmentsData, setProductCategoriesData] = useState<ProductCategoryCollectionResponse>();

    useEffect(() => {
        getProductCategories();
    }, [searchTerm])

    const getProductCategories = () => {
        getAPI('product_categories', {
            is_active: true,
            name_like: searchTerm
        }, (response: any) => {
            const departmentData: ProductCategoryCollectionResponse = response.data;
            setProductCategoriesData(departmentData);
        }, setIsProductCategoriesLoading);
    }

    const showRequired = props.selectedProductCategory === undefined && props.hasSubmitted;

    return (
        <>
            <NewSelectMenu
                iconFont="inventory_2"
                resourceName="product category"
                resourceNamePlural="product categories"
                selectedText={props.selectedProductCategory?.data.name}
                showSearch
                onSearchUpdate={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
                selectItems={departmentsData ? departmentsData.data.map(department => {
                    return {
                        text: department.data.name,
                        clickFunc: () => {
                            props.setSelectedProductCategory(department);
                            props.setSelectedProductCategoryID && props.setSelectedProductCategoryID(department.id)
                        },
                        selected: props.selectedProductCategory?.id === department.id
                    }
                }) : []}
            />
            {props.required && <FormErrorMessage 
                text={`Product category is required`}
                show={showRequired}
            />}

        </>
    )
}

export default ProductCategorySelect