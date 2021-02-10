const db = require('./conn'),
    bcrypt = require('bcryptjs');

class User {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    static async addUser(first_name, last_name, email, password) {
        try {
            const query = `INSERT INTO user_info (first_name, last_name, email, password) VALUES ('${first_name}', '${last_name}', '${email}', '${password}') RETURNING id;`;
            const response = await db.one(query);
            console.log(response);
            return response;
        }
        catch (error) {
            return error.message;
        } 
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async login() {
        try {
            const query = `SELECT * FROM user_info Where email = '${this.email}';`;
            const response = await db.one(query);

            const isValid = this.checkPassword(response.password);
            if (!!isValid) {
                const { id, first_name, last_name } = response;
                return { isValid, user_id: id, first_name, last_name };
            }
            else {
                return { isValid };
            }
        }
        catch (error) {
            return error.message;
        }
    }
}

module.exports = User;