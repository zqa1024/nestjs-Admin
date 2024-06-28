const fetch = require('node-fetch');
const baseUrl = 'http://localhost:3333';
const getToken = async () => {
  const res = await newFetch({
    url: '/auth/local/signin',
    body: {
      email: '11@qq.com',
      username: 'wuku',
      password: 'demo1234',
      Access: 'admin',
    },
    noToken: true,
  });
  const result = res;
  if (result?.data?.accessToken) {
    return result?.data?.accessToken;
  } else {
    console.log('result', result);
  }
  return null;
};

const newFetch = async (options) => {
  const { url, method = 'POST', body, noToken = false } = options;
  const token = noToken ? '' : (await getToken()) || '';
  return fetch(baseUrl + url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : null,
  }).then((res) => res.json());
};

const createRoles = async () => {
  return await newFetch({
    url: '/role/create',
    body: {
      name: 'admin',
      label: 'admin',
      status: 1,
    },
  });
};

const createPromission = async () => {
  return await newFetch({
    url: '/permission/create',
    body: {
      name: 'admin4',
      label: 'admin3',
      status: 1,
      icon: 'icon',
      hide: false,
      order: 1,
      component: 'component',
      route: 'route',
      test: 111,
      parentId: 'clxygx56k0003xtt2syiuko6i',
    },
  });
};

const updatePromission = async () => {
  return await newFetch({
    url: '/permission/update',
    body: {
      id: 'clxygvvmc0001xtt2rcrnu50c',
      name: '首页',
      parentId: 'clxygx56k0003xtt2syiuko6i',
    },
  });
};

(async () => {
  //   const res = await createRoles();
  //   const res = await createPromission();
  const res = await updatePromission();
  console.log('res111', res);
})();
