'use client';

import type { Expert } from '@/types';
import { useState, useEffect } from 'react';
import { recommendExpert, type RecommendExpertInput, type RecommendExpertOutput } from '@/ai/flows/recommend-expert';
import ExpertCard from '@/components/ExpertCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Users } from 'lucide-react';

interface RecommendedExpertsProps {
  expert: Expert;
}

const RecommendedExperts = ({ expert }: RecommendedExpertsProps) => {
  const [recommendations, setRecommendations] = useState<RecommendExpertOutput['recommendedExperts']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const input: RecommendExpertInput = {
          expertName: expert.name,
          expertBio: expert.bio,
          expertPredictions: expert.predictions.map(p => p.text),
        };
        const result = await recommendExpert(input);
        // Map AI output to our Expert type for consistent display, or adjust ExpertCard if needed
        const mappedRecommendations = result.recommendedExperts.map((rec, index) => ({
          id: `rec-${expert.id}-${index}`, // Generate a unique ID
          name: rec.name,
          bio: rec.bio,
          title: 'AI Expert', // Placeholder title
          avatarUrl: 'https://placehold.co/400x400.png', // Placeholder avatar
          expertise: [], // Placeholder expertise, could be derived or added to AI output
          predictions: rec.predictions.map((pText, pIndex) => ({ // Map predictions
            id: `rec-pred-${expert.id}-${index}-${pIndex}`,
            text: pText,
            dateMade: new Date().toISOString(), // Placeholder date
            topic: 'AI', // Placeholder topic
          })),
        })) as Expert[];

        setRecommendations(mappedRecommendations);
      } catch (e) {
        console.error('Error fetching recommendations:', e);
        setError('Failed to load recommendations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [expert]);

  if (isLoading) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Related Experts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <LoadingSpinner size={32} />
          <p className="mt-2 text-muted-foreground">Finding similar experts...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
             <Users className="w-6 h-6 mr-2 text-primary" />
            Related Experts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
       <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary" />
            Related Experts
          </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground text-center py-6">No specific recommendations found at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Users className="w-6 h-6 mr-2 text-primary" />
          Related Experts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recommendations.map((recExpert) => (
            <ExpertCard key={recExpert.id} expert={recExpert} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedExperts;
