'use client';

import EditIcon from '@/icons/edit';

import { SearchInput } from './search-input';

interface TabActionsProps {
  onCreateNewItem?: () => void;
  type: 'chat' | 'project';
  showCreateButton?: boolean;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
}

export default function TabActions({
  onCreateNewItem,
  type,
  showCreateButton = true,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: TabActionsProps) {
  return (
    <div className="p-2 flex justify-end items-center w-full gap-2">
      <SearchInput
        isChatTab={true}
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder || 'Search'}
      />
      {type === 'chat' && (
        <button onClick={onCreateNewItem} className="bg-primary px-3 py-[11px]">
          <EditIcon className="size-6" />
        </button>
      )}
      {type === 'project' && showCreateButton && (
        <button className="bg-primary w-fit py-[11px] px-6 text-sm font-medium leading-5 shadow-sm rounded-xs text-white whitespace-nowrap">
          New Project
        </button>
      )}
    </div>
  );
}
