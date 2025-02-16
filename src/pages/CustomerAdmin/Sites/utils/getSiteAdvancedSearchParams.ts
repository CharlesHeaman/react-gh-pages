export interface SiteAdvancedSearchParams {
    department_id?: string,
    code_like?: string,
    name_like?: string,
    address_like?: string,
    postcode_like?: string,
    telephone_like?: string,
    location_like?: string,
    description_like?: string,
}

const getSiteAdvancedSearchParams = (searchParams: URLSearchParams): SiteAdvancedSearchParams => {
    const department_id = searchParams.get('sites_department_id');
    const code_like = searchParams.get('sites_code_like');
    const name_like = searchParams.get('sites_name_like');
    const address_like = searchParams.get('sites_address_like');
    const postcode_like = searchParams.get('sites_postcode_like');
    const telephone_like = searchParams.get('sites_telephone_like');
    const location_like = searchParams.get('sites_location_like');
    const description_like = searchParams.get('sites_description_like');

    return {
        department_id: department_id ? department_id : undefined,
        code_like: code_like ? code_like : undefined,
        name_like: name_like ? name_like : undefined,
        address_like: address_like ? address_like : undefined,
        postcode_like: postcode_like ? postcode_like : undefined,
        telephone_like: telephone_like ? telephone_like : undefined,
        location_like: location_like ? location_like : undefined,
        description_like: description_like ? description_like : undefined,
    }
}

export default getSiteAdvancedSearchParams