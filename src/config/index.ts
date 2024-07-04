export default () => {
  return {
    /**
     * 应用全局前缀
     */
    appGlobalPrefix: 'api',
    /**
     * 服务启动端口
     */
    port: 3333,
    /**
     * jwt配置
     */
    jwt: {
      secret: 'secretKey',
      signOptions: {
        expiresIn: '1d',
      },
    },

    /**
     * redis配置
     * @type {{host: string; port: number; password: string; db: number}}
     * @property {string} host - redis地址
     * @property {number} port - redis端口
     * @property {string} password - redis密码
     * @property {number} db - redis数据库
     * @property {number} keyPrefix - redis key前缀
     * @property {number} ttl - redis key过期时间
     * @property {number} maxRetriesPerRequest - redis最大重试次数
     */
    redis: {
      host: process.env.REDIS_HOST || '',
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || '',
      db: Number(process.env.REDIS_DB) || 0,
      keyPrefix: process.env.REDIS_KEY_PREFIX || '',
    },

    /**
     * 是否启用 cors
     * 启用就是后端允许跨域
     */
    cors: true,
  };
};
