import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | achievement', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('renderText', 'template block text');

    await render(hbs`<Achievement />`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs` <Achievement @description={{ renderText }} />`);


    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
