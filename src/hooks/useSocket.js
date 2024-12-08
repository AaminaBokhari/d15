import { useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import socketService from '../utils/socketService';

export function useSocket() {
  const { user } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      socketService.connect(user.id);
      socketRef.current = socketService;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  return socketRef.current;
}