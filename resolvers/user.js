import shortid from 'shortid';

import formatErrors from '../shared/formatErrors';
import { tryLogin } from '../shared/auth';

export default {
  User: {
    books: ({ id }, args, { models }) => models.Book.findAll({ where: { owner_id: id } }),
    // myRequests: (parent, args, { models, user }) => models.Request.findAll({ where: { requester_id: user.id } }),
    myRequests: (parent, args, { models, user }) => models.sequelize.query(
      'select * from requests as r join books as b on r.book_id = b.id where requester_id = ?',
      {
        replacements: [user.id],
        model: models.Request,
        raw: true,
      },
    ),
    requestsForMe: (parent, args, { models, user }) => models.sequelize.query(
      'select * from requests as r join books as b on r.book_id = b.id where owner_id = ?',
      {
        replacements: [user.id],
        model: models.Request,
        raw: true,
      },
    ),
  },
  Query: {
    me: (parent, args, { models, user }) => models.User.findOne({ where: { id: user.id } }),
  },
  Mutation: {
    login: (parent, { email, password }, { models, SECRET, SECRET2 }) =>
      tryLogin(email, password, models, SECRET, SECRET2),
    register: async (parent, { username, email, password }, { models, SECRET, SECRET2 }) => {
      try {
        await models.User.create({
          username,
          email,
          password,
          id: shortid.generate(),
        });
        const response = await tryLogin(email, password, models, SECRET, SECRET2);
        return response;
      } catch (err) {
        return {
          ok: false,
          errors: formatErrors(err, models),
        };
      }
    },
    updateUser: async (parent, { username, city, state }, { models, user }) => {
      try {
        await models.User.update(
          {
            username,
            city,
            state,
          },
          {
            where: { id: user.id },
            hooks: false,
          },
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
