'use server';

import { getBenefits } from '@/shared/api';

import { BenefitsSectionClient } from './BenefitsSectionClient';

export async function BenefitsSection() {
	const data = await getBenefits().catch(() => null);

	return <BenefitsSectionClient data={data} />;
}
