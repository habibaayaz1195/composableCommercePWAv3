class Product {
    constructor(title, image, order) {
      this.title = title;
      this.image = image;
      this.order = order;
    }
  
    static fromJSON(json) {
      const items = json.items || [];
      const assetsMap = {};
    json?.includes?.Asset?.forEach(element => {
          assetsMap[element.sys.id] =  element.fields.file.url;

    });

  
      const products = items.map((item) => {
        const fields = item.fields || {};
        const title = fields?.title || "";
        const imageId = fields?.image?.sys?.id || "";
        const order = fields?.order || 0;
  
        const image = assetsMap[imageId] || "";
        return new Product(title, image, order);
      });
  
      products.sort((a, b) => a.order - b.order);
  
      return products;
    }
  }
  
  module.exports = Product;
  