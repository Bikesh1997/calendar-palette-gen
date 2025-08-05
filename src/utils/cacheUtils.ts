
// Utility functions for cache management
export const clearAppCache = () => {
  // Clear localStorage
  localStorage.clear();
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  // Clear any service worker cache if present
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        registration.unregister();
      });
    });
  }
  
  // Clear browser cache programmatically (if supported)
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
};

export const getBuildVersion = () => {
  return process.env.NODE_ENV === 'production' 
    ? document.querySelector('meta[name="build-time"]')?.getAttribute('content') 
    : 'development';
};

export const forceReload = () => {
  // Force a hard reload to bypass cache
  window.location.reload();
};
