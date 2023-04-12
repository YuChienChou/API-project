// backend/routes/api/index.js
const router = require('express').Router();

// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
  
  // ...

module.exports = router;


// fetch('/api/test', {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "XSRF-TOKEN": `QVXMUL7P-j-QFs0uQmRs5xO8SheerHn50B9k`
//     },
//     body: JSON.stringify({ hello: 'world' })
//   }).then(res => res.json()).then(data => console.log(data));