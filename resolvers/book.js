import shortid from 'shortid';

import formatErrors from '../shared/formatErrors';

export default {
  Book: {
    owner: ({ ownerId }, args, { models }) => models.User.findOne({ where: { id: ownerId } }),
    loaner: ({ loanerId }, args, { models }) => models.User.findOne({ where: { id: loanerId } }),
  },
  Query: {
    allBooks: async (parent, args, { models }) => models.Book.findAll({ order: [['title', 'ASC']] }),
  },
  Mutation: {
    addBook: async (parent, args, { models, user }) => {
      try {
        await models.Book.create({
          ...args,
          ownerId: user.id,
          id: shortid.generate(),
        });
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    removeBook: async (parent, { id }, { models }) => {
      try {
        await models.Book.destroy({ where: { id } });
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    requestBook: async (parent, { id }, { models, user }) => {
      try {
        await Promise.all([
          models.Request.create({
            bookId: id,
            requesterId: user.id,
            id: shortid.generate(),
          }),
          models.Book.update(
            {
              requested: true,
            },
            { where: { id } },
          ),
        ]);

        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    returnBook: async (parent, { id }, { models }) => {
      const request = await models.Request.findOne({ where: { id } });

      try {
        await Promise.all([
          models.Book.update(
            {
              loanerId: null,
              requested: false,
            },
            { where: { id: request.bookId } },
          ),
          models.Request.update(
            {
              active: false,
            },
            { where: { id } },
          ),

        ]);
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
  },
};
