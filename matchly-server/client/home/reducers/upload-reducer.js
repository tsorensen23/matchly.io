export default function upload(state = false, action){
  switch(action.type){
    case 'START_UPLOAD':
      return true;
    case 'SUCCESS_DATA_UPLOAD':
      return false;
    default:
      return false;
  }
}

