const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://oanh:oanh123456@cluster0.jhuy1.mongodb.net/tintuc?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then( ()=> console.log('Connected Successfully') )
.catch( ()=> console.log('Connect fail') );