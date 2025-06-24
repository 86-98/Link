
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { experts, expertiseIcons } from '@/lib/data';
import type { Expert } from '@/types';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Briefcase, Linkedin, Twitter, CalendarDays, Tag, FileText, ExternalLink, Sparkles, Instagram, Facebook, Github, Globe as WebsiteIcon } from 'lucide-react';
import RecommendedExperts from './RecommendedExperts';

interface ExpertProfilePageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: ExpertProfilePageProps): Promise<Metadata> {
  const expert = experts.find((e) => e.id === params.id);
  if (!expert) {
    return {
      title: 'Expert Not Found',
    };
  }
  return {
    title: `${expert.name} - AI Oracle`,
    description: expert.bio.substring(0, 160),
  };
}

export async function generateStaticParams() {
  return experts.map((expert) => ({
    id: expert.id,
  }));
}

const socialPlatforms = [
  { key: 'linkedin', name: 'LinkedIn', Icon: Linkedin },
  { key: 'twitter', name: 'Twitter', Icon: Twitter },
  { key: 'instagram', name: 'Instagram', Icon: Instagram },
  { key: 'facebook', name: 'Facebook', Icon: Facebook },
  { key: 'github', name: 'GitHub', Icon: Github },
  { key: 'website', name: 'Website', Icon: WebsiteIcon },
];

export default function ExpertProfilePage({ params }: ExpertProfilePageProps) {
  const expert = experts.find((e) => e.id === params.id);

  if (!expert) {
    notFound();
  }

  const availableSocialLinks = socialPlatforms.filter(platform => expert[platform.key as keyof Expert]);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title={expert.name} description={expert.title} className="mb-6 text-left items-start" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader className="p-6 items-center text-center">
              <Image
                src={expert.avatarUrl}
                alt={expert.name}
                width={150}
                height={150}
                className="rounded-full border-4 border-primary object-cover mb-4 mx-auto"
                data-ai-hint={expert.dataAiHint || "person portrait"}
              />
              <CardTitle className="font-headline text-2xl">{expert.name}</CardTitle>
              <p className="text-muted-foreground">{expert.title}</p>
              {expert.company && (
                <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
                  <Briefcase className="w-4 h-4 mr-1.5" />
                  {expert.company}
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-2 text-lg">Expertise</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {expert.expertise.map((area) => {
                  const IconComponent = expertiseIcons[area] || expertiseIcons.Default;
                  return (
                    <Badge key={area} variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
                      <IconComponent className="w-4 h-4" />
                      {area}
                    </Badge>
                  );
                })}
              </div>
              {availableSocialLinks.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {availableSocialLinks.map(platform => {
                      const url = expert[platform.key as keyof Expert] as string | undefined;
                      if (url) {
                        return (
                          <Button variant="outline" size="sm" asChild key={platform.key}>
                            <Link href={url} target="_blank" rel="noopener noreferrer">
                              <platform.Icon className="w-4 h-4 mr-2" /> {platform.name}
                            </Link>
                          </Button>
                        );
                      }
                      return null;
                    })}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <FileText className="w-6 h-6 mr-2 text-primary" />
                About {expert.name.split(' ')[0]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{expert.bio}</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-primary" />
                Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expert.predictions.length > 0 ? (
                <ul className="space-y-6">
                  {expert.predictions.map((prediction) => (
                    <li key={prediction.id} className="p-4 bg-background rounded-md border border-border">
                      <p className="text-foreground mb-2 text-base leading-relaxed whitespace-pre-line">{prediction.text}</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarDays className="w-3.5 h-3.5 mr-1.5" />
                          {new Date(prediction.dateMade).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center">
                          <Tag className="w-3.5 h-3.5 mr-1.5" />
                          {prediction.topic}
                        </div>
                        {prediction.source && (
                           <Link href={prediction.source} target="_blank" rel="noopener noreferrer" className="flex items-center text-accent hover:underline">
                             <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                             Source
                           </Link>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No predictions available for this expert yet.</p>
              )}
            </CardContent>
          </Card>
          <RecommendedExperts expert={expert} />
        </div>
      </div>
    </div>
  );
}
