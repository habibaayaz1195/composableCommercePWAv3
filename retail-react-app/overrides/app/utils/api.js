import { getAppOrigin } from '@salesforce/pwa-kit-react-sdk/utils/url';
import { getConfig } from '@salesforce/pwa-kit-runtime/utils/ssr-config';

export const fetchContentAsset = async function (assetID, config, getTokenWhenReady, locale) {
    const configENV = getConfig()
    const SITE_URL = (configENV.app && configENV.app.url && configENV.app.url.origin) || getAppOrigin() || '';
    const token = await getTokenWhenReady();

    const url = `${SITE_URL || getAppOrigin()}/mobify/proxy/ocapi/s/${
        config.app.commerceAPI.parameters.siteId
    }/dw/shop/v22_8/content/${assetID}?client_id=${
        config.app.commerceAPI.parameters.clientId
    }&locale=${locale || 'en-US'}`;

    console.log('🔍 Fetching content asset from:', url);

    const response = await fetch(
        `${SITE_URL || getAppOrigin()}/mobify/proxy/ocapi/s/${config.app.commerceAPI.parameters.siteId}/dw/shop/v22_8/content/${assetID}?client_id=${config.app.commerceAPI.parameters.clientId}&locale=${locale || 'en-US'}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );
    if (response.ok) {
        return response.json();
    }
    return { error: true };
};
