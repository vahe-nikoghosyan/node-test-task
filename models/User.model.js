const Model = require('./schema');
const { Product } = require("./Product.model")

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["email"],

            properties: {
                id: { type: "integer" },
                email: { type: "string" },
                full_name: { type: "string" },
                password: { type: "string" },
                created_at: { type: "string" },
                updated_at: { type: "string" },
                verification_token: { type: "string" },
                is_verified: { type: "boolean" },
            }
        }
    }

    static get relationMappings() {
        // One way to prevent circular references
        // is to require the model classes here

        return {
            products: {
                relation: Model.HasManyRelation,

                // The related model. This can be either a Model subclass constructor or an
                // absolute file path to a module that exports one.
                modelClass: Product,

                join: {
                    from: "users.id",
                    to: "products.user_id",
                }
            }
        }
    }
};

module.exports = { User };
