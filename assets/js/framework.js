let fk_fw = {
    elements:{
        head: document.querySelector("head"),
        routeComponent: document.getElementById("route-component")
    },
    routeList: Object.keys(appRoutes),
    components:{

    },
    renderComponent: (htmlElem) =>{
        fk_fw.elements.routeComponent.innerHTML = htmlElem;
    },
    loadJS(src){
        let script = document.createElement("script");
        script.src = src;
        fk_fw.elements.head.appendChild(script);
    },
    router:{
        currentQuery:{},
        getUrlObjects: () => {
            let url = window.location.hash;
            let [hash, queryParamString] = url.split("?");
            let queryParams = {};
            if(typeof queryParamString === "string"){
                queryParamString.split("&").forEach((string) => {
                    let qpObj = string.split("=");
                    queryParams[qpObj[0]] = qpObj[1]
                });
            }
            return {
                hash: hash.replace("#",""),
                queryParams
            }
        },
        transitionRoute: ({hash,queryParams}) => {
            let thisRoute;
            for(let route of fk_fw.routeList){
                if(route.startsWith(hash)){
                    if(queryParams && Object.keys(queryParams).length){
                        if(appRoutes[`${hash}?`].routeInfo.hasQuery){
                            fk_fw.router.currentQuery = queryParams;
                            thisRoute = appRoutes[`${hash}?`];
                            break;
                        }
                    }
                    else{
                        thisRoute = appRoutes[hash];
                    }
                }
            }
            thisRoute.transition(fk_fw.router.currentQuery);
        },
        transitionTo:({hash,queryParams}) => {
            let urlConstruct = `#${hash}`;
            if(queryParams && Object.keys(queryParams).length){
                urlConstruct += "?";
                for(let key in queryParams){
                    urlConstruct += `${key}=${queryParams[key]}`;
                }
            }
            window.location.hash = urlConstruct;
        },
        processUrl: () => {
            fk_fw.router.transitionRoute(fk_fw.router.getUrlObjects());
        }
    }
}