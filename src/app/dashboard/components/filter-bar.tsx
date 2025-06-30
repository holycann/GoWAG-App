"use client";

import React from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface FilterOption<T extends string> {
  label: string;
  value: T;
  checked: boolean;
}

interface FilterBarProps<T extends string> {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  filterGroups?: {
    name: string;
    options: FilterOption<T>[];
    onChange: (value: T, checked: boolean) => void;
  }[];
  sortOptions?: {
    label: string;
    value: string;
    selected: boolean;
  }[];
  onSortChange?: (value: string) => void;
  className?: string;
}

export function FilterBar<T extends string>({
  searchPlaceholder = "Search...",
  onSearchChange,
  filterGroups,
  sortOptions,
  onSortChange,
  className,
}: FilterBarProps<T>) {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  return (
    <div className={cn("flex flex-col sm:flex-row gap-2 mb-6", className)}>
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          className="pl-8 bg-background/50 border-muted focus-visible:ring-primary"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      
      {filterGroups && filterGroups.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {filterGroups.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <DropdownMenuLabel>{group.name}</DropdownMenuLabel>
                <div className="p-2">
                  {group.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`filter-${groupIndex}-${optionIndex}`}
                        checked={option.checked}
                        onChange={(e) => group.onChange(option.value, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label
                        htmlFor={`filter-${groupIndex}-${optionIndex}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {groupIndex < filterGroups.length - 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      {sortOptions && sortOptions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <div className="p-2">
              {sortOptions.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={`sort-${index}`}
                    name="sort"
                    checked={option.selected}
                    onChange={() => onSortChange && onSortChange(option.value)}
                    className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor={`sort-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
} 