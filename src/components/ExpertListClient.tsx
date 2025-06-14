
'use client';

import type { Expert } from '@/types';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ExpertCard from '@/components/ExpertCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, LayoutGrid, List } from 'lucide-react';

interface ExpertListClientProps {
  experts: Expert[];
  allExpertise: string[];
  allImpactAreas: string[];
}

type ViewMode = 'card' | 'list';

const getLastNameInitial = (name: string): string => {
  const nameParts = name.split(' ').filter(part => !part.endsWith('.')); // Remove titles like Dr.
  if (nameParts.length === 0) return '#';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : nameParts[0];
  return lastName.charAt(0).toUpperCase() || '#';
};


const ExpertListClient = ({ experts, allExpertise, allImpactAreas }: ExpertListClientProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');
  const [selectedImpactArea, setSelectedImpactArea] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const nameMatch = expert.name.toLowerCase().includes(searchTerm.toLowerCase());
      const expertiseMatch = selectedExpertise ? expert.expertise.includes(selectedExpertise) : true;
      const impactAreaMatch = selectedImpactArea ? expert.impactArea === selectedImpactArea : true;
      return nameMatch && expertiseMatch && impactAreaMatch;
    });
  }, [experts, searchTerm, selectedExpertise, selectedImpactArea]);

  const groupedExpertsForList = useMemo(() => {
    if (viewMode !== 'list') return {};
    const sorted = [...filteredExperts].sort((a, b) => {
        const nameA = a.name.split(' ').pop() || a.name;
        const nameB = b.name.split(' ').pop() || b.name;
        return nameA.localeCompare(nameB);
    });
    return sorted.reduce((acc, expert) => {
      const initial = getLastNameInitial(expert.name);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div>
            <label htmlFor="search-expert" className="block text-sm font-medium text-foreground mb-1">
              Search by Name
            </label>
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
          <div>
            <label htmlFor="filter-expertise" className="block text-sm font-medium text-foreground mb-1">
              Filter by Expertise
            </label>
            <div className="flex items-center gap-2">
              <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                <SelectTrigger id="filter-expertise" className="w-full">
                  <SelectValue placeholder="All Expertise" />
                </SelectTrigger>
                <SelectContent>
                  {allExpertise.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedExpertise && (
                <button
                  onClick={() => setSelectedExpertise('')}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear expertise filter"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="filter-impact-area" className="block text-sm font-medium text-foreground mb-1">
              Filter by Impact Area
            </label>
            <div className="flex items-center gap-2">
              <Select value={selectedImpactArea} onValueChange={setSelectedImpactArea}>
                <SelectTrigger id="filter-impact-area" className="w-full">
                  <SelectValue placeholder="All Impact Areas" />
                </SelectTrigger>
                <SelectContent>
                  {allImpactAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedImpactArea && (
                <button
                  onClick={() => setSelectedImpactArea('')}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Clear impact area filter"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
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
