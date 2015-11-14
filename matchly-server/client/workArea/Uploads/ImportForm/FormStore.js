import { EventEmitter} from 'events';

// this form store is set up as a gian object of data where the key is the canon field and the object it points to is in the form of { finished: bool, userGiven: string }
class FormStore extends EventEmitter{
  constructor(matched){
    super();
    this.fields = {};
    this.matched = matched;
  }
}
export default FormStore;
