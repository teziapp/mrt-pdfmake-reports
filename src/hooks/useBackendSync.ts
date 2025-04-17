import { useCallback, useEffect, useRef } from 'react';
import { TableState, BackendSyncOptions } from '@/types/table';

interface UseBackendSyncOptions {
  enabled: boolean;
  options?: BackendSyncOptions;
}

export function useBackendSync<TData extends Record<string, any>>({
  enabled,
  options,
}: UseBackendSyncOptions) {
  const syncTimeoutRef = useRef<NodeJS.Timeout>();

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, []);

  const syncState = useCallback(
    async (state: TableState<TData>) => {
      if (!enabled || !options?.endpoint) return;

      try {
        const response = await fetch(options.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(options.token && { Authorization: `Bearer ${options.token}` }),
            ...options.headers,
          },
          body: JSON.stringify(state),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Schedule next sync if auto-sync is enabled
        if (options.enableAutoSync !== false && options.syncInterval) {
          if (syncTimeoutRef.current) {
            clearTimeout(syncTimeoutRef.current);
          }
          syncTimeoutRef.current = setTimeout(
            () => syncState(state),
            options.syncInterval
          );
        }
      } catch (error) {
        console.error('Error syncing table state with backend:', error);
      }
    },
    [enabled, options]
  );

  return {
    syncState,
  };
} 