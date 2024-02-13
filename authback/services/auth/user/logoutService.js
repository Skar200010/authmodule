const User = require('../../../models/user');

const logoutService = async (bodyData, headers) => {
    try {
        const { userId } = bodyData;
        if (!userId) {
            throw new Error('User id required for logout');
        }

        const token = headers.authorization.split(' ')[1];

        // Assuming your user model has a 'token' field
        await User.findByIdAndUpdate(userId, { $set: { status: false, token: null } });

        return { success: true, message: 'Logout Successfully' };
    } catch (error) {
        console.error('Error in logoutService', error);
        throw new Error('Logout failed');
    }
};

module.exports = {
    logoutService,
};
