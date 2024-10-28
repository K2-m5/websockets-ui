import { Player, Room } from '../types';
import { uuidGenerator } from '../utils/uuidGenerator';
import * as DB from './db';

export const createPlayer = (player: Player) => {
  const newPlayer = {
    index: player.index,
    name: player.name,
  };

  DB.players.push(newPlayer);

  return newPlayer;
};

export const createRoom = (userIndex: string) => {
  const newRoom = {
    roomId: uuidGenerator(),
    roomUsers: [],
  } as Room;

  const user = getCurrentUser(userIndex);

  if (!!user) newRoom.roomUsers.push(user);

  DB.rooms.push(newRoom);
};

export const getRooms = () => DB.rooms;

const getCurrentUser = (index: string) => {
  const user = DB.players.find((player) => player.index === index);
  return user;
};

export const addUserToRoom = (indexRoom: string, indexUser: string) => {
  const roomUsers = DB.rooms.find(
    (room) => room.roomId === indexRoom,
  )?.roomUsers;

  const hasCurrentUserInRoom = roomUsers?.some(
    (item) => item.index === indexUser,
  );

  const user = getCurrentUser(indexUser);

  if (!!user && !hasCurrentUserInRoom) roomUsers?.push(user);

  return roomUsers;
};

export const createGame = (indexUser: string) => {
  const newGame = {
    idGame: uuidGenerator(),
    idPlayer: indexUser,
  };

  DB.games.push(newGame);

  return newGame;
};