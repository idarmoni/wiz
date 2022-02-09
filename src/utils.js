
  
  
  export function savercp(recipeName,rcp) {

    alert('saving the file ' + recipeName);
    var temp = JSON.parse(rcp)
    temp = {nodeDataArray: temp.nodeDataArray , linkDataArray:temp.linkDataArray} 
    temp = JSON.stringify(temp,null,'\t')
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: recipeName, rcp: temp})
    };
    fetch('http://localhost:3001/files', requestOptions)
      .then(response => response.json());
  }


  export function receivedRooms(newListOfRooms) {
    return { type: 'RECEIVED_ROOMS', payload: newListOfRooms };
  }
  
  export function setActiveRoom(roomId) {
    return { type: 'SET_ACTIVE_ROOM', payload: roomId };
  }
  
  export function createRoom(roomName) {
    return { type: 'CREATE_ROOM', payload: roomName };
  }
  
  export function receivedMessage(message) {
    return { type: 'RECEIVED_MESSAGE', payload: message };
  }
  
  export function setUsername(newUsername) {
    return { type: 'SET_USERNAME', payload: newUsername };
  }

  
  const initialState = {
    rooms: [
      { id: 0, name: 'Loby' },
      { id: 1, name: 'JavaScript Chats' },
    ],
    activeRoomId: 0,
    messages: [
      { id: 0, from: 'ynon', text: 'Hello Everyone' },
    ],
    username: "guest",
  };
  /*
  const reducer = produce((state, action) => {
    switch(action.type) {
      case 'SET_USERNAME':
        state.username = action.payload;
        break;
  
      case 'RECEIVED_MESSAGE':
        state.messages.push(action.payload);
        break;
  
      case 'CREATE_ROOM':
        state.rooms.push({ id: nextId(state.rooms), name: action.payload });
        break;
  
      case 'SET_ACTIVE_ROOM':
        state.activeRoomId = action.payload;
        break;
  
      case 'RECEIVED_ROOMS':
        state.rooms = action.payload;
        break;
    }
  }, initialState);*/