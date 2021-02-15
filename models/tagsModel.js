'use strict';

const db = require('./conn');

class TagsModel {
    constructor (id, tag_key_reference, video_reference) {
        this.id = id;
        this.tag_key_reference = tag_key_reference;
        this.video_reference = video_reference;
    }
    static async getTagList() {
        try {
            const query = `SELECT * FROM tag_key;`;
            const response = await db.result(query);
            return response;
        } catch(error) {
            return error.message;
        }
    }
    static async addTagToKey(newTag) {
        try {
            const query = `INSERT INTO tag_key (tag_name) VALUES ('${newTag}');`;
            const response = await db.result(query);
            return response;
        } catch(error) {
            return error.message;
        }
    }
    static async addTagToVideo(videoId, new_tag_id) {
        try {
            const query = `INSERT INTO user_tags (tag_key_reference, video_reference) VALUES (${new_tag_id}, '${videoId}');`;
            const response = await db.result(query);
            return response;
        } catch(error) {
            return error.message;
        }
    }
    static async displayVideoTags(videoId) {
        try {
            const query = `
                SELECT * FROM user_tags 
                INNER JOIN tag_key
                    ON user_tags.tag_key_reference = tag_key.id
                WHERE video_reference = '${videoId}';`;
            const response = await db.result(query);
            return response;
        } catch(error) {
            return error.message;
        }
    }
    static async getTaggedVideos(tag_name) {
        try {
            const query = `
            SELECT * FROM user_tags 
                INNER JOIN tag_key
                    ON user_tags.tag_key_reference = tag_key.id
                WHERE tag_name = '${tag_name}';`;
            const response = await db.result(query);
            return response;
        } catch(error) {
            return error.message;
        }
    }
}


module.exports = TagsModel;