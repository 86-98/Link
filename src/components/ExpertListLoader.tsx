
'use client';

import dynamic from 'next/dynamic';
import type { Expert } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';

// Dynamically import ExpertListClient with ssr: false and a loading component
const ExpertListClient = dynamic(() => import('@/components/ExpertListClient'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-12">
      <LoadingSpinner size={36} />
      <p className="mt-4 text-muted-foreground">Loading experts...</p>
    </div>
  ),
});

interface ExpertListLoaderProps {
  experts: Expert[];
  allExpertise: string[];
  allImpactAreas: string[];
}

export default function ExpertListLoader({ experts, allExpertise, allImpactAreas }: ExpertListLoaderProps) {
  // This component will now handle passing props to the dynamically imported ExpertListClient
  return <ExpertListClient experts={experts} allExpertise={allExpertise} allImpactAreas={allImpactAreas} />;
}
