// export function createUser(userData) {
//     return new Promise(async (resolve) => {
//       const response = await fetch('http://localhost:3000/users', {
//         method: 'POST',
//         body: JSON.stringify(userData),
//         headers: { 'content-type': 'application/json' },
//       });
//       const data = await response.json();
//       // TODO: on server it will only return some info of user (not password)
//       resolve({ data });
//     });
//   }
  
export function createUser(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }
  
  // export function loginUser(loginInfo) {
  //   return new Promise(async (resolve, reject) => {
  //     const email = loginInfo.email;
  //     const password = loginInfo.password;
  //     const response = await fetch('http://localhost:3000/users?email=' + email);
  //     const data = await response.json();
  //     // console.log({data})
  //     if (data.length) {
  //       if (password === data[0].password) {
  //         resolve({ data: data[0] });
  //       } else {
  //         reject({ message: 'wrong credentials' });
  //       }
  //     } else {
  //       reject({ message: 'user not found' });
  //     }
  //     // TODO: on server it will only return some info of user (not password)
  //   });
  // }

  export function loginUser(loginInfo) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          body: JSON.stringify(loginInfo),
          headers: { 'content-type': 'application/json' },
        });
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
  
      // TODO: on server it will only return some info of user (not password)
    });
  }

  export function checkAuth() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('http://localhost:3000/auth/check');
        if (response.ok) {
          const data = await response.json();
          resolve({ data });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        reject( error );
      }
    });
  }

  


  
export function signOut(userId) {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: 'success' });
  });
}
