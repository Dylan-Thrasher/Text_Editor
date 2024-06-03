const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //defers event
    window.deferredPrompt = event;

    //displays install button
    butInstall.classList.toggle('hidden', false);

});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const eventPrompt = window.deferredPrompt
    if (!eventPrompt) {
        return;
    }
    eventPrompt.prompt()

    window.deferredPrompt = null
    butInstall.classList.toggle('hidden', true)
});

//  Added an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('J.A.T.E. installed', event);
    window.deferredPrompt = null;
});
