// <headline-list> Component
Vue.component('headline-list', {
  template:
  `
  <div class="headline-list">
      <headline-list-item
        v-for="(headline, i) in headlines"
        :headline="headline"
        :notes="notes"
        :key="headline._id"
        :i="i">
      </headline-list-item>
  </div>
  `,
  props: ['headlines', 'notes']
});

// <headline-list-item> Component
Vue.component('headline-list-item', {
  template:
  `
  <div class="headline-list__item">
      <a :href="headline.link" 
         :id="headline._id" 
         target="_blank">
        {{ headline.title }}
      </a>
      <p>{{ headline.description }}</p>
      <div @click="getNotes(headline._id); showNotes(i)">
        <button class="btn btn-primary">Notes</button>
      </div>
      <headline-note :notes="notes" 
                     :headline="headline" 
                     v-if="isCurrentComponent()"></headline-note>
  </div>
  `,
  props: ['headline', 'i', 'currentComponent', 'notes'],
  methods: {
    getNotes: function(id) {
      $.ajax({
        method: "GET",
        url: "/headlines/" + id
      })
      .then(function(data) {
        vm.notes = data[0].notes;
      })
    },
    showNotes: function(i) {
      if (vm.currentComponent === null) {
        vm.currentComponent = i;
      }
      else {
        vm.currentComponent = null;
      }
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
  <div class="headline-note border rounded">
    <div v-for="note in notes">
      <div class="col-sm headline-note__note-body border rounded">
        <p><strong>{{ note.title }}</strong></p>
        <p>{{ note.body }}</p>
        <button class="headline-note__delete-button btn btn-danger" 
                @click.prevent="deleteNote(note._id)">
          Delete
        </button>
      </div>
    </div>
    <form id="note-form" class="form-group">
      <label for="note-title">Note title</label>
      <input class="form-control" type="text" name="note-title" id="note-title">
      <label for="note-body">Note body</label>
      <textarea class="form-control" type="textarea" name="note-body" id="note-body" rows="5"></textarea>
      <button class="headline-note__submit-button btn btn-success" @click.prevent="postNote(headline)">Submit</button>
    </form>
  </div>
  `,
  props: ['headline', 'notes'],
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
        $("#note-form").empty();
        vm.currentComponent = null;
      });
    },
    deleteNote: function(id) {
      $.ajax({
        method: "POST",
        url: "/notes/" + id
      })
      .then(function() {
        vm.currentComponent = null;
      });
    }
  }
});

const vm = new Vue({
  el: "#app",
  data: {
    theHeadlines: [],
    currentComponent: null,
    notes: []
  },
  mounted: function() {
    $.getJSON('/headlines').done(function(data) {
      vm.theHeadlines = data;
    });
  }
});
