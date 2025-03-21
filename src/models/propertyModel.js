class PropertyModel{
    constructor(property) {
        this.userId = property.userId;
        this.title = property.title;
        this.address = property.address;
        this.city = property.city;
        this.price = property.price;
        this.type = property.type;
        this.description = property.description;
    }
}

export default PropertyModel;