import {database, storage} from '../database/config';

export function createRoom(room, roomid){
    return (dispatch) => {
        return database.ref(`room/${roomid}`).push(room)
        .then( () => {
            dispatch(addRoom(room, roomid))
        })
        .catch( (error) => {
            console.log(error);
        })
    }
}

export function startLoadingRoom(roomid){
    return (dispatch) => {
        return database.ref(`room/${roomid}`).on('value', (snapshot) => { 
            let room = {};
            snapshot.forEach((childSnapshot) => {
                room = childSnapshot.val();
                room["key"]=childSnapshot.key;
            });
            dispatch(loadRoom(room));
        })
    }
}

export function userCheckIn(room, playerkey){
    return (dispatch) => {
        return database.ref(`room/${room.id}/${room.key}/players/${playerkey}`)
        .update({'status': "active"})
        .then( () => {
            dispatch(checkIn(room))
        })
        .catch( (error) => {
            console.log(error);
        })
    }
}

export function removeRoom(roomid){
    return () => {
        return database.ref(`room/${roomid}`)
        .remove();
    }
}

export function startLoadingDares(version){
    return (dispatch) => {
        return database.ref(`dares/${version}`).once('value')
        .then( (snapshot) => {
            let dares = [];
            snapshot.forEach((childSnapshot) => {
                dares.push(childSnapshot.val());
            });
            dispatch(loadDares(dares));
        })
        .catch( (error) => {
            console.log(error);
        })
    }
}

export function startLoadingGallery(roomid){
    return (dispatch) => {
         storage.ref(`${roomid}`).listAll().then(function(result) {
            let images = [];
            result.items.forEach(function(imageRef) {
              imageRef.getDownloadURL().then((url) => {images.push({"url":url}); dispatch(loadGallery(images));} );
            });
          }).catch(function(error) {
            // Handle any errors
            console.log(error);
          });
    }
}

export function updateView(room, view){
    return () => {
        return database.ref(`room/${room.id}/${room.key}/`)
        .update({'view': view})
    }
}

export function updateLastImage(room, image){
    return () => {
        return database.ref(`room/${room.id}/${room.key}/`)
        .update({'lastimage': image})
    }
}

export function updateCard(room, title, description, cardselected){
    return () => {
        let card = {
            title: title,
            description: description,
            status: "show"
        }

        let updates = {};
        updates[`room/${room.id}/${room.key}/card/`] = card;
        updates[`room/${room.id}/${room.key}/cardselected/`] = cardselected;
        return database.ref().update(updates)
    }
}

export function updateCardStatus(room, c, status){
    return () => {
        let card = {
            title: c.title,
            description: c.description,
            status: status
        }
        return database.ref(`room/${room.id}/${room.key}/card/`).update(card)
    }
}

export function updateDrink(room, drink){
    return () => {
        return database.ref(`room/${room.id}/${room.key}/`)
        .update({'drink': drink})
    }
}

export function updateTurn(room, playersturn, turn){
    return () => {
        return database.ref(`room/${room.id}/${room.key}/`)
        .update({'playersturn': playersturn, 'turn': turn})
    }
}

export function checkIn(roomid){
    return {
        type: 'CHECK_IN',
        roomid
    }
}

export function loadRoom(room){
    return {
        type: 'LOAD_ROOM',
        room
    }
}

export function loadDares(dares){
    return {
        type: 'LOAD_DARES',
        dares
    }
}

export function loadGallery(gallery){
    return {
        type: 'LOAD_GALLERY',
        gallery
    }
}

export function addRoom(room, roomid){
    return {
        type: 'ADD_ROOM',
        room,
        roomid
    }
}