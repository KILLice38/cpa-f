import localFont from 'next/font/local';

export const fontHalvarBreit = localFont({
	src: [
		{
			path: '../shared/assets/fonts/HalvarBreit-Lt.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../shared/assets/fonts/HalvarBreit-Rg.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../shared/assets/fonts/HalvarBreit-Md.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../shared/assets/fonts/HalvarBreit-Bd.ttf',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-halvar-breit',
	display: 'swap',
});
export const fontStolzl = localFont({
	src: [
		{
			path: '../shared/assets/fonts/Stolzl-Light.ttf',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../shared/assets/fonts/Stolzl-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
	],
	variable: '--font-stolzl',
	display: 'swap',
});
