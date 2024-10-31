// Import mongoose and Schema from mongoose library
import mongoose, { Schema } from "mongoose";
// Import jwt for generating JSON web tokens and bcrypt for hashing passwords
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define user schema for MongoDB collection with mongoose
const userSchema = new Schema(
    {
        username: {
            type: String,           // Set username as a string
            required: true,          // Make it a required field
            unique: true,            // Ensure username is unique
            lowercase: true,         // Store in lowercase for consistency
            trim: true,              // Remove whitespace around the value
            index: true              // Add an index for faster querying
        },
        email: {
            type: String,           // Set email as a string
            required: true,          // Make it a required field
            unique: true,            // Ensure email is unique
            lowercase: true,         // Store in lowercase for consistency
            trim: true,              // Remove whitespace around the value
        },
        fullname: {
            type: String,           // Set fullname as a string
            required: true,          // Make it a required field
            trim: true,              // Remove whitespace around the value
            index: true              // Add an index for faster querying
        },
        avatar: {
            type: String,           // Set avatar as a string (Cloudinary URL expected)
            required: true           // Make it a required field
        },
        coverImage: {
            type: String,           // Set coverImage as a string (Cloudinary URL expected)
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,  // Refer to ObjectId of another schema
                ref: "Video"                   // Reference to the "Video" schema
            }
        ],
        password: {
            type: String,           // Set password as a string
            required: [true, 'Please provide a password'], // Required with custom error message
        },
        refreshToken: {
            type: String             // Set refreshToken as a string
        }
    },
    { timestamps: true }             // Enable automatic createdAt and updatedAt timestamps
);

// Middleware to hash password before saving user document
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { // If password is not modified, skip hashing
        return next();
    }
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
    next();                           // Proceed to the next middleware
});

// Method to compare provided password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); // Return comparison result
};

// Method to generate JWT access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,           // Include user's _id, email, username, and fullname in payload
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET, // Use secret from environment variable
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Set token expiration from environment
        }
    );
};

// Method to generate JWT refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,           // Include user's _id in payload
        },
        process.env.REFRESH_TOKEN_SECRET, // Use secret from environment variable
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Set token expiration from environment
        }
    );
};

// Export User model based on userSchema for use in other parts of the app
export const User = mongoose.model("User", userSchema);
