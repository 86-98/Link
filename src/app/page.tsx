
import { experts, getAllExpertise, getAllImpactAreas } from '@/lib/data';
import PageHeader from '@/components/PageHeader';
import ExpertListLoader from '@/components/ExpertListLoader';

export default function HomePage() {
  const allExperts = experts; // In a real app, this would be fetched
  const expertiseAreas = getAllExpertise();
  const impactAreas = getAllImpactAreas();

  return (
    <>
      <PageHeader
        title="Meet the AI Oracles"
        description="Discover leading experts in Artificial Intelligence and explore their predictions and insights."
      />
      <ExpertListLoader experts={allExperts} allExpertise={expertiseAreas} allImpactAreas={impactAreas} />
    </>
  );
}
