export default {
    meEndpoint: '/auth/me',
    loginEndpoint: '/jwt/login',
    registerEndpoint: '/jwt/register',
    accessTokenKeyName: 'accessToken',
    refreshTokenKeyName: 'refreshToken',
    onTokenExpiration: 'refreshToken', // logout | refreshToken
    userData: 'userData',

    authOption: process.env.AUTH_OPTION || false,
    authOptions: process.env.AUTH_OPTIONS || ['DATACORE'],
    authDefault: process.env.AUTH_DEFAULT || 'DATACORE'
}
