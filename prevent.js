// Prevent right mouse click and context menu
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// Prevent Ctrl + Shift + I and other shortcuts
document.addEventListener('keydown', function (event) {
    // Check for common developer console shortcuts
    const isChromeOrEdge = event.ctrlKey && (event.shiftKey && (event.key === 'I' || event.key === 'J'));
    const isFirefox = event.ctrlKey && event.shiftKey && (event.key === 'K');
    const isSafari = (event.metaKey && event.shiftKey && (event.key === 'I')); // Cmd + Shift + I for Safari

    // Prevent default for developer tools shortcuts
    if (isChromeOrEdge || isFirefox || isSafari) {
        event.preventDefault();
    }

    // Prevent F12 (common for Edge and other browsers)
    if (event.key === 'F12') {
        event.preventDefault();
    }
});
