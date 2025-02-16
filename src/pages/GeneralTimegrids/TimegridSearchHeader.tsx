import SearchForm from "../../components/form/SearchForm/SearchForm"
import HeaderFlex from "../../components/ui/HeaderFlex"

const TimegridSearchHeader = () => {
    return (
        <>
            <HeaderFlex>
                <SearchForm
                    placeHolder="Search timegrids by name..."
                    prefix="timegrids"
                />
            </HeaderFlex>
        </>
    )
}

export default TimegridSearchHeader