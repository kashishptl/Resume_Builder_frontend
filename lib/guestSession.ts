// Guest session management
export const isGuestUser = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isGuest') === 'true' || !localStorage.getItem('userId');
};

export const createGuestSession = () => {
  const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('guestId', guestId);
  localStorage.setItem('isGuest', 'true');
  return guestId;
};

export const getGuestSession = () => {
  return {
    guestId: localStorage.getItem('guestId'),
    isGuest: localStorage.getItem('isGuest') === 'true'
  };
};

export const clearGuestSession = () => {
  localStorage.removeItem('guestId');
  localStorage.removeItem('isGuest');
};

export const convertGuestToUser = (userId: string) => {
  // Keep the resume data but mark as registered user
  localStorage.setItem('userId', userId);
  localStorage.removeItem('isGuest');
  localStorage.removeItem('guestId');
};
