const User = require('../../../models/user')
const loginService = async (bodyData) => {

    try {
        const { username, password } = bodyData;
        const user = await User.findOne({ username });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const isPasswordMatch = await loginUtil.comparePassword(password, user.password);

        if (isPasswordMatch) {
            const token = await loginUtil.generateToken(user._id, user.username);
            
            await User.findByIdAndUpdate(user._id, { $set: { token, status: true } });

            return { success: true, token, message: 'Login successful' };
        } else {
            return { success: false, message: 'Incorrect password' };
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        throw new Error('Authentication failed');
    }
};
