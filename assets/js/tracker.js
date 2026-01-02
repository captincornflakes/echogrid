/**
 * Visitor Tracking JavaScript Library
 * Automatically tracks page visits and provides analytics functions
 */

class VisitorTracker {
    constructor(apiEndpoint = 'https://dev.echogrid.win/assets/php/visitor-api.php') {
        this.apiEndpoint = apiEndpoint;
        this.tracked = false;
        
        // Auto-track on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.trackPageView());
        } else {
            this.trackPageView();
        }
        
        // Track page unload time for visit duration
        window.addEventListener('beforeunload', () => this.trackPageUnload());
        
        this.startTime = Date.now();
    }
    
    /**
     * Track the current page view
     */
    async trackPageView() {
        if (this.tracked) return; // Prevent double tracking
        
        try {
            const data = {
                action: 'track',
                page_title: document.title,
                screen_resolution: `${screen.width}x${screen.height}`,
                viewport_size: `${window.innerWidth}x${window.innerHeight}`,
                referrer: document.referrer,
                timestamp: new Date().toISOString()
            };
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                credentials: 'omit',
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (result.success) {
                this.tracked = true;
                console.log('✅ Visitor tracked successfully');
            } else {
                console.log('ℹ️ Visitor tracking skipped:', result.message);
            }
            
        } catch (error) {
            console.error('❌ Visitor tracking failed:', error);
        }
    }
    
    /**
     * Track page unload for visit duration
     */
    trackPageUnload() {
        if (!this.tracked) return;
        
        const visitDuration = Math.round((Date.now() - this.startTime) / 1000); // seconds
        
        // Use sendBeacon for reliable tracking on page unload
        if (navigator.sendBeacon) {
            const data = new URLSearchParams({
                action: 'track',
                visit_duration: visitDuration,
                event: 'page_unload'
            });
            
            navigator.sendBeacon(this.apiEndpoint, data);
        }
    }
    
    /**
     * Track custom event
     */
    async trackEvent(eventName, eventData = {}) {
        try {
            const data = {
                action: 'track',
                event_name: eventName,
                event_data: JSON.stringify(eventData),
                timestamp: new Date().toISOString()
            };
            
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                mode: 'cors',
                credentials: 'omit',
                cache: 'no-cache',
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            return result.success;
            
        } catch (error) {
            console.error('Event tracking failed:', error);
            return false;
        }
    }
    
    /**
     * Encode form data for POST requests
     */
    encodeFormData(data) {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }
}

// Auto-initialize visitor tracking
if (typeof window !== 'undefined') {
    window.visitorTracker = new VisitorTracker();
    
    // Global function for easy access
    window.trackEvent = (eventName, eventData) => {
        return window.visitorTracker.trackEvent(eventName, eventData);
    };
}