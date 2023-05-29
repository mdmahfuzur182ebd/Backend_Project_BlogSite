//title , body, author, tags, thumbnail, readTime , like, dislike, comments

const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    thumbnail: String,

    readTime: String,
    likes: [Schema.Types.ObjectId],
    dislike: [Schema.Types.ObjectId],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = model("Post", postSchema);
module.exports = Post;
