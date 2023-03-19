import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'please enter product description']
    },
    price: {
        type: Number,
        required: [true, 'please enter price'],
        maxLength: [8, 'price cannot exceed 8 characters']
    },
    rating: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],// image is not required we can send empty but if we whole array with public_id and url then it is required
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "please enter product stock"],
        maxLength: [4, "stock cannot exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', productSchema) || mongoose.model.Product; 