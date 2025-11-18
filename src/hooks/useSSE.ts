import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useSSE() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const url = `http://10.0.0.7:3001/events`;
    const sse = new EventSource(url, { withCredentials: false });

    sse.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('SSE message:', data);
        if (data.type === 'refetch_locations') {
          console.log('Refetching locations');
          queryClient.invalidateQueries({ queryKey: ['locations'] });
        }
      } catch (err) {
        console.error('Failed to parse SSE message:', err);
      }
    };

    sse.onerror = (err) => {
      console.warn('SSE connection lost. Attempting reconnect...', err);
    };

    return () => {
      console.log('Closing SSE connection');
      sse.close();
    };
  }, []);
}
