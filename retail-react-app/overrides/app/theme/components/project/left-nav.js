import { getAssetUrl } from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils';
import customTheme from './custom-theme';

export const isActiveMatch = (item, buildPath, pathname) => {
    return (
        item.matchPaths?.some((rawPath) => {
            const fullMatchPath = buildPath(rawPath);
            return pathname.startsWith(fullMatchPath);
        }) ?? false
    );
};

export const mobileNavWrapper = {
    mt: '20px',
    px: 0,
    overflowX: { base: 'auto', sm: 'visible' },
    whiteSpace: { base: 'nowrap', sm: 'normal' },
    sx: {
        '::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
    },
};

export const mobileNavLinkWrapper = {
    justify: { base: 'flex-start', sm: 'space-between' },
    minW: 'max-content',
    gap: { base: 6 },
};

export const mobileLinkStyle = (item, buildPath, pathname) => {
    const isActive = isActiveMatch(item, buildPath, pathname);

    return {
        fontSize: customTheme.fontSizes.mobileHeading,
        className: 'font-Geomanist-bold',
        fontWeight: '700',
        _hover: { textDecoration: 'none', opacity: 1 },
        whiteSpace: 'nowrap',
        flex: { base: '0 0 auto', sm: '1' },
        textAlign: 'center',
        sx: {
            '&': {
                color: customTheme.colors.brand.white,
                opacity: isActive ? 1 : 0.5,
            },
        },
    };
};

export const desktopNavWrapper = {
    align: 'stretch',
    spacing: 2,
    position: 'fixed',
    left: '0',
    w: '250px',
    h: 'calc(100vh - 70px)',
    bg: customTheme.colors.brand.white,
    borderRight: `1px solid ${customTheme.colors.brand.borderGray}`,
    p: '16px',
    zIndex: '1000',
};

export const desktopLinkStyle = (item, buildPath, pathname) => {
    const isActive = isActiveMatch(item, buildPath, pathname);

    return {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        p: 3,
        borderRadius: '12px',
        transition: '0.3s',
        className: 'font-Geomanist-book left-nav-links',
        _hover: { textDecoration: 'none' },
        sx: {
            '&': {
                color: isActive ? customTheme.colors.brand.blue : customTheme.colors.brand.darkBlue,
                background: isActive ? customTheme.colors.brand.selectedBg : 'transparent',
                '.nav-icon': {
                    content: `url(${getAssetUrl(`static/img/${isActive ? item.activeIcon : item.icon}`)})`,
                },
            },
        },
    };
};
