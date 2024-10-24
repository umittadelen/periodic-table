// Define three different color themes
const themes = [
    {
        '--noble-gases': '#623842',
        '--alkali-metals': '#244D57',
        '--alkaline-earth-metals': '#622E39',
        '--metalloids': '#523E1B',
        '--nonmetals': '#64B5F6',
        '--reactive-nonmetals': '#2A4165',
        '--transition-metals': '#433C65',
        '--post-transition-metals': '#2F4D47',
        '--unknown-series': '#46474C',
        '--actionids': '#613B28',
        '--lanthanoids': '#004A77',
        
        '--noble-gases-border': '#000',
        '--alkali-metals-border': '#000',
        '--alkaline-earth-metals-border': '#000',
        '--metalloids-border': '#000',
        '--nonmetals-border': '#000',
        '--reactive-nonmetals-border': '#000',
        '--transition-metals-border': '#000',
        '--post-transition-metals-border': '#000',
        '--unknown-series-border': '#000',
        '--actionids-border': '#000',
        '--lanthanoids-border': '#000',
        
        '--text-color': '#FFF',
        '--background': '#1F1F1F'
    },
    {
        '--noble-gases': '#000',
        '--alkali-metals': '#000',
        '--alkaline-earth-metals': '#000',
        '--metalloids': '#000',
        '--nonmetals': '#000',
        '--reactive-nonmetals': '#000',
        '--transition-metals': '#000',
        '--post-transition-metals': '#000',
        '--unknown-series': '#000',
        '--actionids': '#000',
        '--lanthanoids': '#000',

        '--noble-gases-border': '#FF4B5C',
        '--alkali-metals-border': '#FF6F20',
        '--alkaline-earth-metals-border': '#FFEA00',
        '--metalloids-border': '#3AFB77',
        '--nonmetals-border': '#00D6FF',
        '--reactive-nonmetals-border': '#F55FE8',
        '--transition-metals-border': '#A500E4',
        '--post-transition-metals-border': '#FF0078',
        '--unknown-series-border': '#0703fc',
        '--actionids-border': '#6E35FF',
        '--lanthanoids-border': '#32FF3B',
        
        '--text-color': '#FFF',
        '--background': '#000'
    },
    {
        '--noble-gases': '#FFF',
        '--alkali-metals': '#FFF',
        '--alkaline-earth-metals': '#FFF',
        '--metalloids': '#FFF',
        '--nonmetals': '#FFF',
        '--reactive-nonmetals': '#FFF',
        '--transition-metals': '#FFF',
        '--post-transition-metals': '#FFF',
        '--unknown-series': '#FFF',
        '--actionids': '#FFF',
        '--lanthanoids': '#FFF',

        '--noble-gases-border': '#000',
        '--alkali-metals-border': '#000',
        '--alkaline-earth-metals-border': '#000',
        '--metalloids-border': '#000',
        '--nonmetals-border': '#000',
        '--reactive-nonmetals-border': '#000',
        '--transition-metals-border': '#000',
        '--post-transition-metals-border': '#000',
        '--unknown-series-border': '#000',
        '--actionids-border': '#000',
        '--lanthanoids-border': '#000',
        
        '--text-color': '#000',
        '--background': '#FFF'
    }
];

let currentThemeIndex = 0;

// Function to switch themes
function switchTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const theme = themes[currentThemeIndex];

    for (const [key, value] of Object.entries(theme)) {
        document.documentElement.style.setProperty(key, value);
    }
}

// Add event listener for right-click
document.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Prevent default context menu
    switchTheme(); // Switch color theme
});

// Prevent Ctrl + Shift + I and other shortcuts
document.addEventListener('keydown', function (event) {
    // Check for common developer console shortcuts
    const isChromeOrEdge = event.ctrlKey && (event.shiftKey && (event.key === 'I' || event.key === 'J'));
    const isFirefox = event.ctrlKey && event.shiftKey && (event.key === 'K');
    const isSafari = (event.metaKey && event.shiftKey && (event.key === 'I')); // Cmd + Shift + I for Safari

    if (event.key === ' ') {
        switchTheme();
    }
    // Prevent default for developer tools shortcuts
    if (isChromeOrEdge || isFirefox || isSafari) {
        event.preventDefault();
    }

    // Prevent F12 (common for Edge and other browsers)
    if (event.key === 'F12') {
        event.preventDefault();
    }
});
