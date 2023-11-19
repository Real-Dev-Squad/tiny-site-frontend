export const alphanumicUnderscore = /^[a-zA-Z0-9_]+$/;
export const urlRegex = new RegExp(
    '^(https?:\\/\\/)?' + // protocol like 'http://' or 'https://'
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name like 'realdevsquad.com'
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address like '123.456.78.90'
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path like '/foo/bar'
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string like '?foo=bar'
        '(\\#[-a-z\\d_]*)?$', // fragment locator like '#ref'
    'i'
);

export const removeProtocol = /(^\w+:|^)\/\//;
