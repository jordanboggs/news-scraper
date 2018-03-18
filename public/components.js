/*
 * VUE
 */
Vue.component('headline-list', {
  template:
  `
  <div class="headline-list">
    <ul>
      <headline-list-item
        v-for="(headline, i) in headlines"
        :headline="headline"
        :key="headline._id">
      </headline-list-item>
    </ul>
  </div>
  `,
  props: ['headlines']
});

Vue.component('headline-list-item', {
  template:
  `
  <div class="headline-list__item">
    <li>
      <a :href="headline.link" target="_blank">
        {{ headline.title }}
      </a>
    </li>
  </div>
  `,
  props: ['headline']
})

const vm = new Vue({
  el: "#app",
  data: {
    theHeadlines: []
  },
  mounted: function() {
    $.getJSON('/headlines').done(function(data) {
      vm.theHeadlines = data;
    });
  }
});
