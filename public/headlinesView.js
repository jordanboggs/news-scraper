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
        :key="headline._id"
        :i="i">
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
      <a :href="headline.link" 
         :id="headline._id" 
         target="_blank">
        {{ headline.title }}
      </a>
      <div @click="populateNote(headline.id, i)">
        <button>Notes</button>
      </div>
    </li>
  </div>
  `,
  props: ['headline', 'i'],
  methods: {
    populateNote: function(id, i) {
      $.ajax({
        method: 'GET',
        url: '/headlines/' + id
      })
      .then(function(data) {
        console.log("note:", data.note);
        // Create a new child component for displaying/adding notes
      });
    }
  }
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
