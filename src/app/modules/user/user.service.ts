import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserInToDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUsersFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const deleteUserFromDB = async (id: number) => {
  const result = await UserModel.deleteOne({ userId: id });
  return result;
};

const updateUserInDB = async (id: number, updatedUserData: User) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { userId: id },
    updatedUserData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedUser;
};

const updateUserAndOrdersInDB = async (
  id: number,
  updatedUserAndOrderData: User,
) => {
  const updatedUserAndOrders = await UserModel.findOneAndUpdate(
    { userId: id },
    updatedUserAndOrderData,
    {
      new: true,
      runValidators: true,
    },
  );
  return updatedUserAndOrders;
};

const getOredersUsersFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

const getOredersCalculatFromDB = async (id: number) => {
  const result = await UserModel.findOne({ userId: id });
  return result;
};

export const UserService = {
  createUserInToDB,
  getAllUsersFromDB,
  getSingleUsersFromDB,
  deleteUserFromDB,
  updateUserInDB,
  updateUserAndOrdersInDB,
  getOredersUsersFromDB,
  getOredersCalculatFromDB,
};
