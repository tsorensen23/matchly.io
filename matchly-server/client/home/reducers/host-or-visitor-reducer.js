export default function hostsOrVisitors(state = false, action) {
  switch(action.type) {
    case 'SET_HOSTS':
      return true;
    case 'SET_VISITORS':
      return false;
    default:
      return state;
  }
}
