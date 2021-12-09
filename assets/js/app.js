window.onhashchange = () => {
    fk_fw.router.processUrl();
}

window.onload = () => {
    if(window.location.hash.trim() === ""){
        window.location.hash="#/";
        return;
    }
    fk_fw.router.processUrl();
}