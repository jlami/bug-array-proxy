import Controller from '@ember/controller';
import {computed} from '@ember/object';
import {alias} from '@ember/object/computed';
import {A} from '@ember/array';
import ArrayProxy from '@ember/array/proxy';

const PagedArray = ArrayProxy.extend({
  perPage: 2,
  
  arrangedContent: computed("content.[]", "page", "perPage", function() {
    let page = this.get('page');
    let perPage = this.get('perPage');
    let result = this.get('content').slice((page-1)*perPage, page*perPage);
    return result;
  }),
});

function pagedArray(modelName, pageName) {
  return computed("", function() {
    let instanceOpts = {
      parent: this
    };
    let classOpts = {
      content: alias('parent.' + modelName),
      page: alias('parent.' + pageName)
    };
    
    const paged = PagedArray.extend(classOpts).create(instanceOpts);

    // paged.lockToRange();
    return paged;
  });
}

export default Controller.extend({
  model: A([1, 2, 3, 4, 5, 6, 7]),
  page: 1,
  
  pagedContent: pagedArray('model', 'page'),
  
  actions: {
    next() {
      this.incrementProperty('page');
    },
    
    prev() {
      this.decrementProperty('page');
    },
  }
});
