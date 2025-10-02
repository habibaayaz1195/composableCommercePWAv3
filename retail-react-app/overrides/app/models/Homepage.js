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

class Slider {
    constructor(images,order,id,title) {
        this.images = images
        this.order = order
        this.id = id
        this.title = title
        this.componentType = "slider"
      }

      
    
      

    static fromJson(json) {
        const id = json.sys?.id
        const order = json.fields.order
        const title = json.fields.title

        const myimages = []
        json?.fields?.images?.forEach(element => {

            myimages.push(SharedData.assets[element.sys?.id])
        });
        
        return new Slider(
            myimages,
            order,
            id,
            title
        );
    }
}

class FAssets {
    constructor(f_assets,order,id,title) {
        this.f_assets = f_assets
        this.order = order
        this.title=title
        this.id = id
        this.componentType = "f_assets"

      }

    static fromJson(json) {
        const id = json.sys?.id
        const order = json.fields.order
        const title = json.fields.title

        const f_assets = []
        json?.fields?.fAssets?.forEach(element => {
            const f_asset_id = element.sys?.id
            const myentry =  SharedData.entry[f_asset_id]
            
            myentry['asset'] = SharedData.assets[myentry?.asset.sys?.id]
            f_assets.push(myentry)
        });
        return new FAssets(
            f_assets,
            order,
            id,
            title
        );
    }
}

class FCategories {
    constructor(f_categories,order,id,title) {
        this.f_categories = f_categories
        this.order = order
        this.title=title
        this.id = id
        this.componentType = "f_categories"

      }

    static fromJson(json) {
        const id = json.sys?.id
        const order = json.fields.order
        const title = json.fields.title

        const f_categories = []
        json?.fields?.featuredCategories?.forEach(element => {
            const f_category_id = element.sys?.id
            const myentry =  SharedData.entry[f_category_id]
            
            myentry.asset = SharedData.assets[myentry.asset.sys?.id]
            f_categories.push(myentry)
        });
        return new FCategories(
            f_categories,
            order,
            id,
            title
        );
    }
}

class f_products{
    constructor(productIds,order,id,title) {
        this.products = productIds
        this.order = order
        this.title = title
        this.id = id
        this.componentType = "f_products"

      }

    static fromJson(json) {
        const id = json.sys?.id
        const order = json.fields.order
        const title = json.fields.title

        
        const productIds = []
        console.log("json",json)
        json?.fields?.fProducts?.forEach(element => {
            const f_product_id = element?.sys?.id
            const myentry =  SharedData.entry[f_product_id]
            productIds.push(myentry.product)
        });
        console.log("productIds",productIds)

        return new f_products(
            productIds,
            order,
            id,
            title
        );
    }
}
class Homepage {

    constructor(components){
        this.components = components
    }
    static fromJson(json) {
        SharedData.getLinksAndAssets(json);

        const components = [];
        json?.items.forEach(element => {
            if (element.fields.componentType === "slider") {
                components.push(Slider.fromJson(element));
            } else if (element.fields.componentType === "f_assets") {
                components.push(FAssets.fromJson(element));
            } else if(element.fields.componentType === "f_Categories"){
                components.push(FCategories.fromJson(element));
            }
            else if(element.fields.componentType === "f_products"){
                components.push(f_products.fromJson(element));
            }
            
        });
        

        components.sort((a, b) => a.order - b.order);
        return new Homepage(components)
    }
}

module.exports = Homepage;

