'use client';

export function reportWebVitals(metric) {
  const { id, name, label, value } = metric;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Web Vital: ${name} (${label}) = ${value}`);
  }

  // Store metrics in localStorage for analysis
  if (typeof window !== 'undefined') {
    const metrics = JSON.parse(localStorage.getItem('webVitals') || '[]');
    metrics.push({
      name,
      value,
      timestamp: Date.now(),
      url: window.location.pathname
    });
    
    // Keep only last 50 metrics
    if (metrics.length > 50) {
      metrics.splice(0, metrics.length - 50);
    }
    
    localStorage.setItem('webVitals', JSON.stringify(metrics));
  }

  // You can send to your analytics service here
  // Example with Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: label,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }
}

// Performance Observer for custom metrics
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return;

  // Create Performance Observer
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log long tasks (tasks that take more than 50ms)
      if (entry.entryType === 'longtask') {
        console.warn('Long Task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
          name: entry.name
        });
      }
    });
  });

  // Observe long tasks
  observer.observe({ entryTypes: ['longtask'] });

  // Monitor memory usage
  if (window.performance && window.performance.memory) {
    setInterval(() => {
      const memory = window.performance.memory;
      if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
        console.warn('High memory usage detected:', {
          used: memory.usedJSHeapSize,
          total: memory.jsHeapSizeLimit
        });
      }
    }, 5000);
  }
}

// Helper function to measure component render time
export function measureRenderTime(Component) {
  return function WrappedComponent(props) {
    const startTime = performance.now();
    
    const result = <Component {...props} />;
    
    const endTime = performance.now();
    console.log(`${Component.name} render time: ${endTime - startTime}ms`);
    
    return result;
  };
} 