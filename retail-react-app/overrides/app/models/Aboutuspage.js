class AssetInfo {
    constructor(id, url, height,width,filename) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
        this.filename = filename;

      }

      
    
      

    static fromJson(assetData) {
        const id = assetData.sys?.id;
        const url = assetData.fields.file.url;
        const height = assetData.fields.file.details.image.height;
        const width = assetData.fields.file.details.image.width;
        const filename = assetData.fields.file.fileName;

        return new AssetInfo(
            id,
            url,
            height,
            width,
            filename
        );
    }
}

class SharedData {
    static entry = {};
    static assets = {};

    static getLinksAndAssets(json) {
        json?.includes?.Entry.forEach(element => {
            SharedData.entry[element.sys?.id] = element.fields;
        });

        json?.includes?.Asset.forEach(element => {
            SharedData.assets[element.sys?.id] = AssetInfo.fromJson(element);
        });
    }
}


class Believes {
    constructor(believes,order,id,title,bg_color) {
        this.believes = believes
        this.order = order
        this.title=title
        this.id = id
        this.componentType = "believes"
        this.bg_color=bg_color

      }

    static fromJson(json) {
        const id = json.sys?.id
        const order = json.fields?.order
        const title = json.fields?.title
        const bg_color = json.fields?.bg_color

        

        const believes = []
        json?.fields?.believes?.forEach(element => {
            const f_asset_id = element.sys?.id
            const myentry =  SharedData.entry[f_asset_id]
            believes.push(myentry)
        });
        return new Believes(
            believes,
            order,
            id,
            title,
            bg_color
        );
    }
}


class Information {
    constructor(informations,order,id,title,bg_color) {
        this.informations = informations
        this.order = order
        this.title=title
        this.id = id
        this.componentType = "information"
        this.bg_color=bg_color

      }

    static fromJson(json) {
        const id = json.sys?.id
        const order = json.fields?.order
        const title = json.fields?.title
        const bg_color = json.fields?.bg_color

        

        const myentry = SharedData.entry[json?.fields?.informations?.sys?.id]
        myentry['asset'] = SharedData?.assets[myentry?.image.sys?.id]

        //generating html from rich text



        return new Information(
            myentry,
            order,
            id,
            title,
            bg_color
        );
    }

}


class Aboutuspage {

    constructor(components){
        this.components = components
    }
    static getImage(id){
        console.log("shared ",SharedData.assets)
        return SharedData.assets[id];
     }
    static fromJson(json) {
        SharedData.getLinksAndAssets(json);

        const components = [];
        json?.items.forEach(element => {
            if (element.fields.componentType === "believe") {
                components.push(Believes.fromJson(element));
            } else if (element.fields.componentType === "information") {
                components.push(Information.fromJson(element));
            }
        });
        

        components.sort((a, b) => a.order - b.order);
        return new Aboutuspage(components)
    }
}

module.exports = Aboutuspage;
