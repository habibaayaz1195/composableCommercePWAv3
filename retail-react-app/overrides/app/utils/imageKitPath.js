import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

export function getImageKitURL(image) {
    const config = getConfig()
    const IMAGEKIT_URL = config.app.IMAGEKIT_URL

    if (!IMAGEKIT_URL || !image) return image

    const defaultIndex = image.indexOf("/default")

    // If "/default" is not found, return the original image URL
    if (defaultIndex === -1) return image

    return IMAGEKIT_URL + "/" + image.substring(defaultIndex + 1)
}