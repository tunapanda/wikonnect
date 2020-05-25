import Ember from 'ember';

export default Ember.Notes.extend({
    didRender() {
        this.$().keypress(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }
});
