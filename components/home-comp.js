fk_fw.components["home-comp"] = {
    data:{

    },
    getData(){
        return fetch("https://flipkart-email-mock.vercel.app/");
    },
    render(){
        const emailList = this.data.list;
        emailList[0].isFavourite = true;
        emailList[3].isFavourite = true;
        let eachEmail = "";
        emailList.forEach((thisEmail) => {
            eachEmail += `
                <a class="each-email-href" href="#/?id=${thisEmail.id}">
                    <div class="each-email ${thisEmail.isFavourite ? 'favorite' : ''}">
                        <div class="avatar">
                            <div class="avatar-image">${thisEmail.from.name[0].toUpperCase()}</div>
                        </div>
                        <div class="content">
                            <span class="label">From: </span><span class="value">${thisEmail.from.name} &lt;${thisEmail.from.email}&gt;</span>
                            <div class="separator"></div>
                            <span class="label">Subject: </span><span class="value">${thisEmail.subject}</span>
                            <div class="separator">&nbsp;</div>
                            ${thisEmail.short_description}
                            <div class="separator-xs">&nbsp;</div>
                            ${new Date(thisEmail.date).toLocaleString()} &emsp; ${thisEmail.isFavourite ? '<span class="fav-label">Favorite</span>' : ''}
                        </div>
                    </div>
                </a>
            `;
        })
        return `
            <div class="home-comp">
                ${eachEmail}
            </div>
        `;
    }
}