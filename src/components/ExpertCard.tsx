
import Link from 'next/link';
import Image from 'next/image';
import type { Expert } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, ExternalLink } from 'lucide-react';
import { expertiseIcons } from '@/lib/data';

interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard = ({ expert }: ExpertCardProps) => {
  const IconComponent = expertiseIcons[expert.expertise[0]] || expertiseIcons['Default'];
  
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      <CardHeader className="p-4">
        {/* Image and Name are always in a horizontal flex layout */}
        <div className="flex items-center gap-4">
          <Image
            src={expert.avatarUrl}
            alt={expert.name}
            width={80}
            height={80}
            className="rounded-full border-2 border-primary object-cover shrink-0" // Added shrink-0
            data-ai-hint={expert.dataAiHint || "person portrait"}
          />
          <div className="flex-1 min-w-0"> {/* Added min-w-0 for better flex handling if name is long */}
            <CardTitle className="font-headline text-xl sm:text-2xl mb-1 truncate">{expert.name}</CardTitle> {/* Added truncate */}
            {/* Title and Company shown here for screens < md. Hidden for md+ */}
            <div className="block md:hidden">
              <CardDescription className="text-sm sm:text-base text-muted-foreground truncate">{expert.title}</CardDescription>
              {expert.company && (
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                  <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 shrink-0" />
                  <span>{expert.company}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title and Company shown here for screens >= md. Positioned below the Image/Name block. */}
        <div className="hidden md:block mt-2 text-right">
          <CardDescription className="text-sm sm:text-base text-muted-foreground">{expert.title}</CardDescription>
          {expert.company && (
            <div className="flex items-center justify-end text-xs sm:text-sm text-muted-foreground mt-1">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 shrink-0" />
              <span>{expert.company}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3 line-clamp-3">{expert.bio}</p>
        <div className="flex flex-wrap gap-2">
          {expert.expertise.slice(0, 3).map((area) => {
            const AreaIcon = expertiseIcons[area] || expertiseIcons['Default'];
            return (
              <Badge key={area} variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5 text-xs sm:text-sm">
                <AreaIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                {area}
              </Badge>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 border-t">
        <Button asChild className="w-full" variant="default">
          <Link href={`/experts/${expert.id}`}>
            View Profile
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpertCard;
