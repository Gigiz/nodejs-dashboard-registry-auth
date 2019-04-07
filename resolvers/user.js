const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

const resolvers = {
  Query: {
    me: async (parent, args, context) => context.user ? context.user : null,
  },
  Mutation: {
    signup: async (parent, args) => {
      const user = new User({
        ...args,
        password: await argon2.hash(args.password),
      });
      return await user.save();
    },
    signin: async (parent, args, context) => {
      const user = await User.findOne({
        username: args.username,
      });
      if (user && await argon2.verify(user._doc.password, args.password)) {
        const { JWT_SECRET } = process.env;
        delete user._doc.password;
        return jwt.sign(user._doc, JWT_SECRET);
      }
      return null;
    },
  },
};

module.exports = resolvers;