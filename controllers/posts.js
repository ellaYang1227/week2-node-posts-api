const Post = require('../models/post');
const resHandle = require('../services/resHandle');

const posts = {
    async getPosts ({ req, res }) {
        const posts = await Post.find();
        resHandle(res, 200, posts);
    },
    async createPosts ({ req, res, body }) {
        try {
            const { name, image, content, type, tags } = JSON.parse(body);
            const addPost = await Post.create({ name, image, content, type, tags });
            resHandle(res, 200, addPost);
        } catch ({ errors }) {
            resHandle(res, 400, errors);
        }
    },
    async deletePosts ({ req, res }) {
        await Post.deleteMany({});
        const posts = await Post.find();
        resHandle(res, 200, posts);
    },
    async deletePost ({ req, res, url }) {
        const id = url.split('/').pop();
        const delPost = await Post.findByIdAndDelete(id);
        if (delPost) {
            resHandle(res, 200, delPost);
        } else {
            resHandle(res, 400);
        }
        
    },
    async editPost ({ req, res, url, body }) {
        try {
            const { name, image, content, type, tags } = JSON.parse(body);
            const updateData = { name, image, content, type, tags };
            const id = url.split('/').pop();
            await Post.findByIdAndUpdate(id, updateData);
            const updatePost = await Post.findById(id);

            if (updatePost) {
                resHandle(res, 200, updatePost);
            } else {
                resHandle(res, 400);
            }
        } catch ({ errors }) {
            resHandle(res, 400, errors);
        }
    }

};

module.exports = posts;