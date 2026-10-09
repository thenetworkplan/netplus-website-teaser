/**
 * Runs before first paint: applies the saved (or system) theme and language
 * to <html> so there is no flash of the wrong theme.
 */
export const PREFS_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('np-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t);var l=localStorage.getItem('np-lang');if(l!=='fr'&&l!=='en'){l=(navigator.language||'en').toLowerCase().indexOf('fr')===0?'fr':'en'}d.lang=l}catch(e){}})();`;
