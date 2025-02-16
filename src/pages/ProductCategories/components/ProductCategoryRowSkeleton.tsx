import Skeleton from "../../../components/ui/General/Skeleton/Skeleton"

const ProductCategoryRowSkeleton = () => {
    return (
        <tr>
            <td><Skeleton type="label" width={200}/></td>
            <td><Skeleton type="label" width={400}/></td>
        </tr>
    )
}

export default ProductCategoryRowSkeleton