import formatErrors from '../shared/formatErrors';

export default {
  Request: {
    book: ({ bookId }, args, { models }) => models.Book.findOne({ where: { id: bookId } }),
    owner: ({ bookId }, args, { models }) => models.sequelize.query(
      'select * from users as u join books as b on u.id = b.owner_id where b.id = ?',
      {
        replacements: [bookId],
        model: models.User,
        raw: true,
      },
    ),
    requester: ({ requesterId }, args, { models }) => models.User.findOne({ where: { id: requesterId } }),
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
    removeRequest: async (parent, { id }, { models }) => {
      try {
        await models.Request.update(
          { active: false },
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
