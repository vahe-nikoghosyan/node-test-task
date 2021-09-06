const Model = require('./schema');
const { User } = require('./User.model');

class Product extends Model {
    static get tableName () {
        return "products";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name"],

            properties: {
                id: { type: "integer" },
                name: { type: "string" },
                description: { type: "string" },
                category: { type: "string" },
                price: { type: "string" },
                user_id: { type: "integer" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
            }
        }
    }

    static get relationMappings () {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "products.user_id",
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = { Product };
