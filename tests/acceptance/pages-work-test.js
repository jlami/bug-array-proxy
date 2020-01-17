import { module, test } from 'qunit';
import { visit, click, find } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | pages work', function(hooks) {
  setupApplicationTest(hooks);

  test('Next button works with arrayproxy', async function(assert) {
    await visit('/');

    assert.equal(find("li").innerText, 1);
    
    await click("button.next");
    
    assert.equal(find("li").innerText, 3);
  });
  
  test('Next button works with createClassComputed', async function(assert) {
    await visit('/');

    assert.equal(find(".createClassComputed li").innerText, 1);
    
    await click("button.next");
    
    assert.equal(find(".createClassComputed li").innerText, 3);
  });
});
