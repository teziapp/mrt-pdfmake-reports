import { useCallback } from 'react';
import { TableState } from '@/types/table';

interface UseLocalStorageSyncOptions {
  enabled: boolean;
  storageKey: string;
}

export function useLocalStorageSync<TData extends Record<string, any>>({
  enabled,
  storageKey,
}: UseLocalStorageSyncOptions) {
  const loadState = useCallback(() => {
    if (!enabled) return null;

    try {
      const savedState = localStorage.getItem(storageKey);
      return savedState ? (JSON.parse(savedState) as TableState<TData>) : null;
    } catch (error) {
      console.error('Error loading table state from localStorage:', error);
      return null;
    }
  }, [enabled, storageKey]);

  const saveState = useCallback(
    (state: TableState<TData>) => {
      if (!enabled) return;

      try {
        localStorage.setItem(storageKey, JSON.stringify(state));
      } catch (error) {
        console.error('Error saving table state to localStorage:', error);
      }
    },
    [enabled, storageKey]
  );

  return {
    loadState,
    saveState,
  };
} 