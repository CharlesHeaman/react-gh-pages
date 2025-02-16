export interface CustomerAdvancedSearchParams {
    code_like?: string,
    name_like?: string,
    is_contracted?: string,
    email_like?: string,
    telephone_like?: string,
    address_like?: string,
    postcode_like?: string,
    sage_name_like?: string,
    accounts_email_like?: string,
    accounts_status?: string
}

const getCustomerAdvancedSearchParams = (searchParams: URLSearchParams): CustomerAdvancedSearchParams => {
    const codeLike = searchParams.get('customers_code_like');
    const nameLike = searchParams.get('customers_name_like');
    const isContracted = searchParams.get('customers_is_contracted');
    const emailLike = searchParams.get('customers_email_like');
    const telephoneLike = searchParams.get('customers_telephone_like');
    const addressLike = searchParams.get('customers_address_like');
    const postcodeLike = searchParams.get('customers_postcode_like');
    const sageNameLike = searchParams.get('customers_sage_name_like');
    const accountsEmailLike = searchParams.get('customers_accounts_email_like');
    const accountsStatus = searchParams.get('customers_accounts_status');

    return {
        code_like: codeLike ? codeLike : undefined,
        name_like: nameLike ? nameLike : undefined,
        is_contracted: isContracted ? isContracted : undefined,
        email_like: emailLike ? emailLike : undefined,
        telephone_like: telephoneLike ? telephoneLike : undefined,
        address_like: addressLike ? addressLike : undefined,
        postcode_like: postcodeLike ? postcodeLike : undefined,
        sage_name_like: sageNameLike ? sageNameLike : undefined,
        accounts_email_like: accountsEmailLike ? accountsEmailLike : undefined,
        accounts_status: accountsStatus ? accountsStatus : undefined,
    }
}

export default getCustomerAdvancedSearchParams