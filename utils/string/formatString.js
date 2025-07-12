function formatString(value, maxLength, noValueText, checkLanguage = true) {
    const regex = checkLanguage ? /^[A-Za-z0-9.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>]$/ : /^[A-Za-z\u0400-\u04FF0-9.!@?#"$%&:;() *\+,\/;\-=[\\\]\^_{|}<>]$/
    if (![...Array(value).join("")].every((symbol) => regex.test(symbol))) return ""

    if (!value) return noValueText || ""
    
    maxLength && (value = value.slice(0, maxLength))
    value = value.trim()
    value = value.replace(/\s{2,}/g, " ")

    return value
}

export default formatString