import Configuration from 'infrastructure/util/configuration';

const headers = {
  'Content-Type': 'application/json'
}

const url = (path) => Configuration.DECIDE_API + path;

export default class Http {

  static async get(path) {
      const response = await fetch(url(path), {
          method: 'GET',
          headers
      })
      return await response.json();
  }

  static async post(path, body) {
      const response = await fetch(url(path), {
          method: 'POST',
          headers,
          body
      })
      return await response.json();
  }

  static async put(path, body) {
      const response = await fetch(url(path), {
          method: 'PUT',
          headers,
          body
      })
      return await response.json();
  }

  static async delete(path) {
      const response = await fetch(url(path), {
          method: 'DELETE',
          headers
      })
      return await response.json();
  }

}