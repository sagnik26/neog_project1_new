export function getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|iPad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    } else if (['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod',].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document && navigator.maxTouchPoints > 1)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};
