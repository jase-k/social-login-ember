import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {},
  async authenticate(un, pw) {
    let response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: un,
        password: pw,
      }),
      credentials: 'include',
    });
    if (response.ok) {
      console.log(response);
      return response.json();
    } else {
      let error = await response.text();
      throw new Error(error);
    }
  },
  async invalidate() {
    let logout = await fetch('http://localhost:8000/api/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    // if (response.ok) {
    //   console.log(response);
    //   return response.json();
    // } else {
    //   let error = await response.text();
    //   throw new Error(error);
    // }
  },
});
