import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/web/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/web/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/web/user/logout',
    method: 'post'
  })
}
