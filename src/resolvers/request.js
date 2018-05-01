import formatErrors from '../shared/formatErrors';

export default {
  Request: {
    book: ({ book_id }, args, { models }) => models.Book.findOne({ where: { id: book_id } }),
    requester: ({ requester_id }, args, { models }) => models.User.findOne({ where: { id: requester_id } }),
  },
  Mutation: {
    approveRequest: async (parent, { id }, { models }) => {
      try {
        await models.Request.update(
          { approved: true },
          { where: { id } },
        );
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
