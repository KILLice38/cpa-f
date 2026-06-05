export const DESKTOP_NAV_ITEMS = [
	{ key: 'team', href: '#team' },
	{ key: 'benefits', href: '#benefits' },
	{ key: 'joinUs', href: '#join-us' },
] as const;

export const MOBILE_NAV_ITEMS = [{ key: 'main', href: '#main' }, ...DESKTOP_NAV_ITEMS] as const;
