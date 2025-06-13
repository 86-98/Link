'use client';

import type { Expert } from '@/types';
import { useState, useMemo } from 'react';
import ExpertCard from '@/components/ExpertCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

interface ExpertListClientProps {
  experts: Expert[];
  allExpertise: string[];
}

const ExpertListClient = ({ experts, allExpertise }: ExpertListClientProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string>('');

  const filteredExperts = useMemo(() => {
    return experts.filter((expert) => {
      const nameMatch = expert.name.toLowerCase().includes(searchTerm.toLowerCase());
      const expertiseMatch = selectedExpertise ? expert.expertise.includes(selectedExpertise) : true;
      return nameMatch && expertiseMatch;
    });
  }, [experts, searchTerm, selectedExpertise]);

  return (
    <div>
      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
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
                {/* <SelectItem value="">All Expertise</SelectItem>  <- This item caused the error */}
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
        </div>
      </div>

      {filteredExperts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-xl py-12">
          No experts found matching your criteria.
        </p>
      )}
    </div>
  );
};

export default ExpertListClient;
