import { Schema, model } from 'mongoose';
import { User } from './user/user.interface';

const userSchema = new Schema<User>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },

  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
  },

  fullName: {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
  },

  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    enum: ['reading', 'traveling', 'gardening'],
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  orders: [
    {
      productName: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

export const UserModel = model<User>('User', userSchema);