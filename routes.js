class route{
    constructor(routeInfo){
        this.routeInfo = routeInfo;
    }

    transition(){
        //apply transition
        if(typeof fk_fw.components[this.routeInfo.component] === "undefined"){
            fk_fw.loadJS(`components/${this.routeInfo.component}.js`);
        }
        let intervalElem;
        intervalElem = setInterval(() => {
            async function getCompData(component){
                let apiResponse = await component.getData();
                let apiData = await apiResponse.json();
                component.data = apiData;
                fk_fw.renderComponent(component.render()); 
            }
            if(fk_fw.components[this.routeInfo.component]){
                clearInterval(intervalElem);
                let component = fk_fw.components[this.routeInfo.component];
                if(component.getData){
                    getCompData(component);
                }
                else{
                    fk_fw.renderComponent(component.render()); 
                }
            }
        },0)
    }
}

let appRoutes = {
    "/": new route({
        "component":"home-comp"
    }),
    "/?": new route({
        "component": "email-comp",
        "hasQuery": true,
        query: ["id","filter"]
    })
}