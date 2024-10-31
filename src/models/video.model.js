// Import mongoose and Schema from mongoose library
import mongoose, { Schema } from "mongoose";
// Import mongooseAggregatePaginate plugin for pagination functionality
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Define video schema for MongoDB collection with mongoose
const videoSchema = new Schema(
    {
        videoFile: {
            type: String,           // Set videoFile as a string
            required: true,          // Make it a required field
        },
        thumbnail: {
            type: String,           // Set thumbnail as a string
            required: true,          // Make it a required field
        },
        title: {
            type: String,           // Set title as a string
            required: true,          // Make it a required field
        },
        description: {
            type: String,           // Set description as a string
            required: true,          // Make it a required field
        },
        duration: {
            type: Number,           // Set duration as a number (e.g., in seconds)
            required: true,          // Make it a required field
        },
        views: {
            type: Number,           // Set views as a number
            default: 0               // Set default value to 0
        },
        isPublished: {
            type: Boolean,          // Set isPublished as a boolean
            default: false           // Set default value to false
        },
        owner: {
            type: Schema.Types.ObjectId, // Refer to ObjectId of another schema
            ref: "User"             // Reference to the "User" schema
        }
    },
    { timestamps: true }            // Enable automatic createdAt and updatedAt timestamps
);

// Add pagination functionality to video schema using the plugin
videoSchema.plugin(mongooseAggregatePaginate);

// Export Video model based on videoSchema for use in other parts of the app
export const Video = mongoose.model("Video", videoSchema);
