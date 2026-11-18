'use client';

import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { useAppStore } from '@/store';
import type { Project, ProjectCategory } from '@/store';

import React, { useState } from 'react';

import { CustomTabTrigger } from '../shared/chat-tab-trigger';
import ProjectContentItem from '../shared/project-content-item';
import TabActions from '../shared/tab-actions';

const tabsConfig = [
  { value: 'active', label: 'Active', status: 'active' as const },
  { value: 'onhold', label: 'On-hold', status: 'on-hold' as const },
  { value: 'completed', label: 'Completed', status: 'completed' as const },
];

interface ProjectSelectorProps {
  showCreateButton?: boolean;
  onCreateProject?: () => void;
  className?: string;
}

export default function ProjectSelectorTab({
  showCreateButton = false,
  className = 'w-96 2xl:w-[496px]',
}: ProjectSelectorProps) {
  const {
    project: { categories },
  } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Tabs defaultValue="active" className={className}>
      <TabsList className="w-full border-r border-r-Bg-Dark h-fit">
        {tabsConfig.map((tab) => (
          <CustomTabTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </CustomTabTrigger>
        ))}
      </TabsList>

      <TabActions
        showCreateButton={showCreateButton}
        type="project"
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      {tabsConfig.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="p-2 flex flex-col border-r border-r-Bg-Dark gap-3"
        >
          <ProjectCategoriesList
            categories={categories}
            status={tab.status}
            showCreateButton={showCreateButton}
            searchQuery={searchQuery}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface ProjectCategoriesListProps {
  categories: ProjectCategory[];
  status: 'active' | 'on-hold' | 'completed';
  showCreateButton?: boolean;
  searchQuery?: string;
}

function ProjectCategoriesList({
  categories,
  status,
  showCreateButton,
  searchQuery = '',
}: ProjectCategoriesListProps) {
  const filteredCategories = getFilteredCategories(categories, status, searchQuery);

  if (filteredCategories.length === 0) {
    return (
      <div className="py-4 px-2 text-center">
        <p className="text-sm text-text-secondary">No projects found.</p>
      </div>
    );
  }

  return (
    <>
      {filteredCategories.map((category) => (
        <ProjectContentItem
          key={category.id}
          title={category.name}
          projects={getFilteredProjects(category.projects, status, searchQuery)}
          showCreateButton={showCreateButton}
          isSearchActive={searchQuery.trim().length > 0}
        />
      ))}
    </>
  );
}

function getFilteredCategories(
  categories: ProjectCategory[],
  status: 'active' | 'on-hold' | 'completed',
  searchQuery: string = '',
) {
  const query = searchQuery.trim().toLowerCase();
  return categories.filter((category) =>
    category.projects.some((project) => {
      const matchesStatus = project.status.toLowerCase() === status;
      const matchesTitle = query ? project.title.toLowerCase().includes(query) : true;
      return matchesStatus && matchesTitle;
    }),
  );
}

function getFilteredProjects(
  projects: Project[],
  status: 'active' | 'on-hold' | 'completed',
  searchQuery: string = '',
) {
  const query = searchQuery.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesStatus = project.status.toLowerCase() === status;
    const matchesTitle = query ? project.title.toLowerCase().includes(query) : true;
    return matchesStatus && matchesTitle;
  });
}
