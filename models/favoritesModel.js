'use strict';

const db = require('./conn');

class FavoritesModel {
    constructor (id, video_reference, user_reference) {
        this.id = id;
        this.video_reference = video_reference;
        this.user_reference = user_reference;
    }
    async getFavorites() {
        try {
            const query = `SELECT * FROM favorite_videos WHERE user_reference = ${this.user_reference};`;
            const response = await db.result(query);
            return response;
        }
        catch(error) {
            return error.message;
        }
    }
    async addFavorites() {
        try {
            const query = `INSERT INTO favorite_videos (video_reference, user_reference) VALUES ('${this.video_reference}', ${this.user_reference});`;
            const response = await db.result(query);
            return response;
        }
        catch(error) {
            return error.message;
        }
    }
    async checkFavorites() {
        try {
            const query = `SELECT * FROM favorite_videos WHERE user_reference = ${this.user_reference} AND video_reference = ${this.video_reference};`;
        } catch(error) {
            return error.message;
        }
    }
}

module.exports = FavoritesModel;