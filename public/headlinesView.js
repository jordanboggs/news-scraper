/*
 * VUE
 */
// <headline-list> Component
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

// <headline-list-item> Component
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
      <p>{{ headline.description }}</p>
      <div @click="showNotes(i)">
        <button>Notes</button>
      </div>
      <p v-if="isCurrentComponent()">Notes are showing</p>
    </li>
  </div>
  `,
  props: ['headline', 'i', 'currentComponent'],
  methods: {
    showNotes: function(i) {
      vm.currentComponent = i;
      this.isCurrentComponent();
    },
    isCurrentComponent: function() {
      return vm.currentComponent === this.i;
    }
  }
})

// <headline-note> Component

const vm = new Vue({
  el: "#app",
  data: {
    theHeadlines: [],
    currentComponent: null
  },
  mounted: function() {
    $.getJSON('/headlines').done(function(data) {
      vm.theHeadlines = data;
    });
  }
});
