module.exports = {
  index: async (req, res, next) => {
    try {
      return res.status(200).json({
        status: 'success',
        message: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
