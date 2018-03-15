const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const expressVue = require('express-vue');

const app                  = express();
const PORT                 = process.env.PORT || 3000;
const expressVueMiddleware = expressVue.init();
app.use(expressVueMiddleware);

// Routing for Vue
router.get('/', (req, res, next) => {
  const data = {
    // This is what we'll pass in from Mongoose later, instead of the dummy 
    // data below
    otherData: 'Something Else'
  };
  req.vueOptions = {
    head: {
      title: "News Nabber",
      metas: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: './public/assets/favicon.ico'}
      ]
    }
  }
  res.renderVue('index.vue', data, req.vueOptions);
})
