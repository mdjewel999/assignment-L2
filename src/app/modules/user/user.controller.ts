import { Request, Response } from 'express';
import { UserService } from './user.service';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const result = await UserService.createUserInToDB(userData);
    
    const {...userDataWithoutPassword } = result.toObject();

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: userDataWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};



// all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userIdNumber = Number(userId);

    if (isNaN(userIdNumber)) {
      throw new Error('Invalid UserId, must be a number');
    }
    const result = await UserService.getSingleUsersFromDB(userIdNumber);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

//Update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body.user;

    const updatedUser = await UserService.updateUserInDB(
      parseInt(userId, 10),
      updatedUserData,
    );

    if (updatedUser) {
      const { ...userWithoutPassword } = updatedUser.toObject();

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: userWithoutPassword,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

//delate user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userIdNumber = parseInt(userId);

    const deletedUser = await UserService.deleteUserFromDB(userIdNumber);

    if (deletedUser) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

//add New Product To Order
const addNewProductToOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId);
    const { productName, price, quantity } = req.body;

    const user = await UserService.getSingleUsersFromDB(userIdNumber);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    if (!user.orders || !Array.isArray(user.orders)) {
      user.orders = [];
    }
    user.orders = user.orders.flat();
    user.orders.push({
      productName,
      price,
      quantity,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

//get All Orders For User

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId);
    const user = await UserService.getOredersUsersFromDB(userIdNumber);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: {
        orders: user.orders || [],
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

//calculate Total Price For User

const calculateTotalPriceForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userIdNumber = parseInt(userId);
    const user = await UserService.getOredersCalculatFromDB(userIdNumber);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    const totalPrice = user.orders
      ? user.orders.reduce(
          (value, order) => value + order.price * order.quantity,
          0,
        )
      : 0;
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
  addNewProductToOrder,
  getAllOrdersForUser,
  calculateTotalPriceForUser,
};
