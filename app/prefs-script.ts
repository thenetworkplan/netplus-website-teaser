/**
 * Runs before first paint: applies the theme and language to <html> so there is no flash.
 *
 * Language: every visit opens in the language of the visitor's browser (French if their
 * preferred browser language is French, English otherwise). A language picked with the
 * EN/FR switch is kept only for the current tab (sessionStorage), so reloading keeps it,
 * but the next visit starts again from the browser language.
 */
export const PREFS_SCRIPT = `(function(){var d=document.documentElement;
try{var t=localStorage.getItem('np-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.setAttribute('data-theme',t)}catch(e){}
var l=null;try{l=sessionStorage.getItem('np-lang')}catch(e){}
if(l!=='fr'&&l!=='en'){l='en';var ls=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en']);for(var i=0;i<ls.length;i++){var c=String(ls[i]).toLowerCase().slice(0,2);if(c==='fr'||c==='en'){l=c;break}}}
d.lang=l})();`;
