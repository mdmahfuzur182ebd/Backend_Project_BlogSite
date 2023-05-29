// user id,title, bio, profilePics, links {fb, twi}, posts, bookmark

const { Schema, model } = require("mongoose");
const Post = require("./Post");
const User = require("./User");

const ProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    profilePic: {
      type: String,
    },
    links: [
      {
        website: String,
        facebook: String,
        twitter: String,
        github: String,
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: Post,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", ProfileSchema);
module.exports = Profile;
