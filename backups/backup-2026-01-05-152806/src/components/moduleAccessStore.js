<<<<<<< HEAD
// In-memory store for demo/prototyping.
=======
﻿// In-memory store for demo/prototyping.
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
// For production: swap with MongoDB/Postgres/Redis, etc.
const store = [];

module.exports = {
  addRequest(req) { store.push(req); },
  getRequest(email, module) { return store.find(r => r.email === email && r.module === module); },
  getRequestByToken(token) { return store.find(r => r.token === token); },
  approve(email, module) {
    const req = store.find(r => r.email === email && r.module === module);
    if (req) req.approved = true;
    return req;
  },
  isApproved(email, module) {
    const req = store.find(r => r.email === email && r.module === module);
    return req?.approved || false;
  },
  getAll() { return store; },
<<<<<<< HEAD
};
=======
};
>>>>>>> 993d94e13b445157adc68096d1c13f8cf30f3a75
