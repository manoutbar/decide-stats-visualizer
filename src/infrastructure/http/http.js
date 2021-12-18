
const headers = {
  'Content-Type': 'application/json'
}

export default class Http {

  static async get(url) {
      const response = await fetch(url, {
          method: 'GET',
          headers
      })
      return await response.json();
  }

  static async post(url, body) {
      const response = await fetch(url, {
          method: 'POST',
          headers,
          body
      })
      return await response.json();
  }

  static async put(url, body) {
      const response = await fetch(url, {
          method: 'PUT',
          headers,
          body
      })
      return await response.json();
  }

  static async delete(url) {
      const response = await fetch(url, {
          method: 'DELETE',
          headers
      })
      return await response.json();
  }

}