const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://bikramnahak9714:c2qKnlmErYZ0BR2q@cluster0.9n2j2.mongodb.net/blog-post-panel')
  .then(() => console.log('Data base is Connected Successfully....')).catch((err)=>{
    console.log('Database conectivity is faild..!',err);
  });
