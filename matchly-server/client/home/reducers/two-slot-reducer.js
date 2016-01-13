export default function twoSlots (state = false, action){
  switch(action.type) {
    case 'CHANGE_SLOTS':
      if(action.value == 'threeSlots'){
        return false;
      }
      if(action.value === 'twoSlots'){
        return true;
      }
    default: 
      return state;
  }
}
