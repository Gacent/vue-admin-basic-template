// 用于表单验证的方法封装
/**
 * @param {string} path
 * @returns {Boolean}
 * 检测是否是外部链接
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 登录时候检测用户是否在指定数组内
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
