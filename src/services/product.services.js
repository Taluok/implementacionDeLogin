import { ProductModel } from '../models/product.model.js';

export default class ProductServices {
    async getAll(page = 1, limit = 10, sortOrder = 'desc', query = null) {
        try {
            const queryObject = query ? JSON.parse(query) : {};
            const filter = this.buildFilter(queryObject);

            const myAggregate = ProductModel.aggregate([{ $match: filter }]);
            const options = { page, limit, sort: { price: sortOrder } };

            const result = await ProductModel.aggregatePaginate(myAggregate, options);
            return result;
        } catch (error) {
            console.error('Error in getAll:', error);
        }
    }

    async getById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.error('Error in getById:', error);
        }
    }

    async create(productData) {
        try {
            return await ProductModel.create(productData);
        } catch (error) {
            console.error('Error in create:', error);
        }
    }

    async update(id, updatedData) {
        try {
            return await ProductModel.findByIdAndUpdate({ _id: id }, updatedData, { new: true });
        } catch (error) {
            console.error('Error in update:', error);
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error in delete:', error);
        }
    }

    buildFilter(queryObject) {
        const filter = {};
        for (const [key, value] of Object.entries(queryObject)) {
            if (key === 'category') {
                filter.category = value;
            } else if (key === 'disponibility') {
                filter.stock = value ? { $gt: 0 } : { $lt: 1 };
            }
        }
        return filter;
    }
}

