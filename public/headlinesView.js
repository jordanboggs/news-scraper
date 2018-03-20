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
      <headline-note :headline="headline" v-if="isCurrentComponent()"></headline-note>
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
Vue.component('headline-note', {
  template:
  `
  <div id="notes" class="headline-note">
    <form>
      <label for="note-title">Note title</label>
      <input type="text" name="note-title" id="note-title">
      <label for="note-body">Note body</label>
      <input type="text" name="note-body" id="note-body">
      <button @click.prevent="postNote(headline)">Submit</button>
    </form>
  </div>
  `,
  props: ['headline'],
  methods: {
    postNote: function(headline) {
      let id = headline._id;
      let noteData = {
        title: $("#note-title").val().trim(),
        body: $("#note-body").val().trim()
      }

      $.ajax({
        method: "POST",
        url: "/headlines/" + id,
        data: noteData
      })
      .then(function(response) {
        res.json(response);
        $("#notes").empty();
      });
    }
  }
});

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
