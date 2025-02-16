import { Helmet } from "react-helmet"
import NoneFound from "../General/NoneFound/NoneFound"
import { ReactComponent as ErrorImg } from './../../../assets/images/web_asset_off_black_24dp.svg';

function PageNotFound() {
    return (
        <>
            <Helmet>
                <title>Page not found</title>
            </Helmet>
            <NoneFound 
                iconFont="error" 
                text='Page not found'
            />
        </>
    )
}

export default PageNotFound