const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRun: async (parent, run, context) => {
      if (context.user) {
        let user = await User.findOne({ _id: context.user._id})
        user.priorRuns.push(run)
        const updatedHighscore = Math.max(run.score, user.statistics.highScore);
        const updatedRunNumber = user.statistics.runNumber + 1;
        const updatedAvgScore = Math.round(((user.statistics.avgScore * user.statistics.runNumber) + run.score) / (user.statistics.runNumber + 1))
        const updatedStatistics = {
          highScore: updatedHighscore,
          runNumber: updatedRunNumber,
          avgScore: updatedAvgScore,
        }
        updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id},
          {
            priorRuns: user.priorRuns,
            statistics: {
              highScore: updatedHighscore,
              runNumber: updatedRunNumber,
              avgScore: updatedAvgScore,
            }
          },
          {
            new: true
          }
        )
        const token = signToken(updatedUser);
        return { token, user: updatedUser }
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
