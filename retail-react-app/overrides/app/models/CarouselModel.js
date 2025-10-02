class CarouselModel {
    constructor(title, images) {
      this.title = title;
      this.images = images;
    }
  
    static fromJSON(json) {
      const items = json.items || [];

      const assetsMap = {};
      json?.includes?.Asset?.forEach(element => {
            assetsMap[element.sys.id] =  element.fields.file.url;
  
      });
      console.log("asset",assetsMap,json)
      const carouselData = items.map((item) => {
        const fields = item.fields || {};
        const title = fields.title || "";
        const imageLinks = fields.images || [];
  
        // Retrieve image URLs from the assets map
        const images = imageLinks.map((imageLink) =>
          assetsMap[imageLink.sys.id] || ""
        );
  
        return new CarouselModel(title, images);
      });
  
      return carouselData[0];
    }
  }
  
  module.exports = CarouselModel;
  