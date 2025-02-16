import ListItem from "../../../../components/ui/Containers/ListItem/ListItem"
import ListWrapper from "../../../../components/ui/Containers/ListWrapper/ListWrapper"
import Skeleton from "../../../../components/ui/General/Skeleton/Skeleton"

const TimegridListSkeleton = (props: {
    perPage: number
}) => {
    return (
        <ListWrapper>
            {[...Array(props.perPage)].map((_, index) => 
                <ListItem key={index}>
                    <Skeleton type={'small-title'} width={110}/>
                    <Skeleton type={'small-title'} width={50} marginRight/>
                    <Skeleton type={'small-title'} width={50}/>
                    <Skeleton type={'small-label'} width={100}/>
                </ListItem>
            )}
        </ListWrapper>
    )
}

export default TimegridListSkeleton