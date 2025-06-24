'use client';

import { useState } from 'react';
import type { Expert } from '@/types';
import { recommendExpert, type RecommendExpertOutput } from '@/ai/flows/recommend-expert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Wand2 } from 'lucide-react';

interface RecommendedExpertsProps {
  expert: Expert;
}

export default function RecommendedExperts({ expert }: RecommendedExpertsProps) {
  const [recommendations, setRecommendations] = useState<RecommendExpertOutput['recommendedExperts'] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations(null);
    try {
      const input = {
        expertName: expert.name,
        expertBio: expert.bio,
        expertPredictions: expert.predictions.map(p => p.text),
      };
      const result = await recommendExpert(input);
      setRecommendations(result.recommendedExperts);
    } catch (e) {
      console.error(e);
      setError('Sorry, something went wrong while getting recommendations.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg mb-8">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Wand2 className="w-6 h-6 mr-2 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Want to discover other experts with similar profiles? Let our AI find some for you.
        </p>
        <Button onClick={handleGetRecommendations} disabled={loading}>
          {loading ? <LoadingSpinner size={20} className="mr-2" /> : <Wand2 className="w-4 h-4 mr-2" />}
          {loading ? 'Finding Experts...' : `Find experts like ${expert.name.split(' ')[0]}`}
        </Button>

        {error && <p className="text-destructive mt-4">{error}</p>}

        {recommendations && recommendations.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">Here are some AI-powered recommendations:</h3>
            {recommendations.map((recExpert, index) => (
              <div key={index} className="p-4 bg-background rounded-md border">
                <h4 className="font-bold text-md">{recExpert.name}</h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{recExpert.bio}</p>
                <div className="mt-3">
                  <h5 className="text-xs uppercase font-semibold text-muted-foreground mb-1.5">Sample Predictions:</h5>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {recExpert.predictions.slice(0, 2).map((pred, i) => (
                      <li key={i} className="line-clamp-1">{pred}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {recommendations && recommendations.length === 0 && !loading && (
            <p className="text-muted-foreground mt-4">The AI couldn't find any recommendations at this time.</p>
        )}
      </CardContent>
    </Card>
  );
}
