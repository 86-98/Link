import { experts, getAllExpertise } from '@/lib/data';
import PageHeader from '@/components/PageHeader';
import ExpertListClient from '@/components/ExpertListClient';

export default function HomePage() {
  const allExperts = experts; // In a real app, this would be fetched
  const expertiseAreas = getAllExpertise();

  return (
    <>
      <PageHeader
        title="Meet the AI Oracles"
        description="Discover leading experts in Artificial Intelligence and explore their groundbreaking predictions and insights."
      />
      <ExpertListClient experts={allExperts} allExpertise={expertiseAreas} />
    </>
  );
}
