
'use client';

import type { Expert } from '@/types';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ExpertCard from '@/components/ExpertCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, LayoutGrid, List, ListFilter, X } from 'lucide-react';

interface ExpertListClientProps {
  experts: Expert[];
  allExpertise: string[];
  allImpactAreas: string[];
}

type ViewMode = 'card' | 'list';

const getEffectiveFirstName = (name: string): string => {
  if (!name) return "";
  const trimmedName = name.trim();
  if (!trimmedName) return "";

  const nameParts = trimmedName.split(' ').filter(part => part.length > 0);
  if (nameParts.length === 0) return "";

  const titles = /^(Dr\.?|Mr\.?|Ms\.?|Mrs\.?|Prof\.?)$/i;

  let currentPartIndex = 0;
  while (currentPartIndex < nameParts.length && titles.test(nameParts[currentPartIndex])) {
    currentPartIndex++;
  }

  if (currentPartIndex < nameParts.length) {
    return nameParts[currentPartIndex];
  }
  
  return nameParts[0] || ""; 
};

const getFirstNameInitial = (name: string): string => {
  const effectiveFirstName = getEffectiveFirstName(name);
  if (!effectiveFirstName) return '#';

  const firstChar = effectiveFirstName.charAt(0).toUpperCase();
  return /^[A-Z]$/.test(firstChar) ? firstChar : '#';
};


const ExpertListClient = ({ experts, allExpertise, allImpactAreas }: ExpertListClientProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertiseAreas, setSelectedExpertiseAreas] = useState<string[]>([]);
  const [selectedImpactAreas, setSelectedImpactAreas] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleExpertiseChange = (expertise: string) => {
    setSelectedExpertiseAreas(prev =>
      prev.includes(expertise)
        ? prev.filter(item => item !== expertise)
        : [...prev, expertise]
    );
  };

  const handleImpactAreaChange = (impactArea: string) => {
    setSelectedImpactAreas(prev =>
      prev.includes(impactArea)
        ? prev.filter(item => item !== impactArea)
        : [...prev, impactArea]
    );
  };

  const clearAllFilters = () => {
    setSelectedExpertiseAreas([]);
    setSelectedImpactAreas([]);
  };

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const nameMatch = expert.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const expertiseMatch = selectedExpertiseAreas.length === 0
        ? true
        : expert.expertise.some(area => selectedExpertiseAreas.includes(area));
        
      const impactAreaMatch = selectedImpactAreas.length === 0
        ? true
        : expert.impactArea ? selectedImpactAreas.includes(expert.impactArea) : selectedImpactAreas.length === 0;


      return nameMatch && expertiseMatch && impactAreaMatch;
    });
  }, [experts, searchTerm, selectedExpertiseAreas, selectedImpactAreas]);

  const groupedExpertsForList = useMemo(() => {
    if (viewMode !== 'list') return {};

    const sortedExperts = [...filteredExperts].sort((a, b) => {
      const firstNameA = getEffectiveFirstName(a.name);
      const firstNameB = getEffectiveFirstName(b.name);

      const firstNameComparison = firstNameA.toLowerCase().localeCompare(firstNameB.toLowerCase());
      if (firstNameComparison !== 0) {
        return firstNameComparison;
      }
      
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    return sortedExperts.reduce((acc, expert) => {
      const initial = getFirstNameInitial(expert.name);
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(expert);
      return acc;
    }, {} as Record<string, Expert[]>);
  }, [filteredExperts, viewMode]);


  return (
    <div>
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-grow">
            <Label htmlFor="search-expert" className="block text-sm font-medium text-foreground mb-1">
              Search by Name
            </Label>
            <div className="relative">
              <Input
                id="search-expert"
                type="text"
                placeholder="e.g., Aris Thorne"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex-shrink-0">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <ListFilter className="mr-2 h-4 w-4" />
                  Filter ({selectedExpertiseAreas.length + selectedImpactAreas.length})
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 flex justify-between items-center border-b">
                    <h3 className="text-lg font-medium">Filter Experts</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsPopoverOpen(false)} className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="p-4">
                    <div className="mb-4">
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Filter by Expertise</h4>
                      <ScrollArea className="h-48">
                        <div className="space-y-2">
                          {allExpertise.map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <Checkbox
                                id={`exp-${area}`}
                                checked={selectedExpertiseAreas.includes(area)}
                                onCheckedChange={() => handleExpertiseChange(area)}
                              />
                              <Label htmlFor={`exp-${area}`} className="font-normal text-sm cursor-pointer">
                                {area}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>

                    <Separator className="my-4" />

                    <div className="mb-4">
                      <h4 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Filter by Impact Area</h4>
                      <ScrollArea className="h-auto max-h-48">
                        <div className="space-y-2">
                          {allImpactAreas.map((area) => (
                            <div key={area} className="flex items-center space-x-2">
                              <Checkbox
                                id={`imp-${area}`}
                                checked={selectedImpactAreas.includes(area)}
                                onCheckedChange={() => handleImpactAreaChange(area)}
                              />
                              <Label htmlFor={`imp-${area}`} className="font-normal text-sm cursor-pointer">
                                {area}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </ScrollArea>
                <div className="border-t p-4 flex justify-between items-center">
                  <Button onClick={clearAllFilters} variant="ghost" size="sm">
                    Clear All Filters
                  </Button>
                   <Button onClick={() => setIsPopoverOpen(false)} size="sm">
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('card')}
            aria-label="Card view"
          >
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {filteredExperts.length > 0 ? (
        viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        ) : (
          <div className="space-y-10">
            {Object.keys(groupedExpertsForList).sort().map((initial) => (
              <section key={initial} aria-labelledby={`section-title-${initial}`}>
                <h2 id={`section-title-${initial}`} className="font-headline text-4xl font-bold text-primary mb-6 pb-2 border-b border-border">
                  {initial}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-3">
                  {groupedExpertsForList[initial].map((expert) => (
                    <Link
                      key={expert.id}
                      href={`/experts/${expert.id}`}
                      className="text-foreground hover:text-primary hover:underline py-1.5 transition-colors duration-150 text-sm truncate"
                      title={expert.name}
                    >
                      {expert.name}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )
      ) : (
        <p className="text-center text-muted-foreground text-xl py-12">
          No experts found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default ExpertListClient;

