import { Schema, model } from 'mongoose';
import validator from 'validator';
import { User } from './user/user.interface';

const userSchema = new Schema<User>(
  {
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
        validate: {
          validator: (value: string) => validator.isAlpha(value),
          message: '{VALUE} is not valid',
        },
      },
    },

    age: {
      type: Number,
      required: true,
      validate: {
        validator: (value: number) => value >= 18 && value <= 99,
        message: 'Age must be between 18 and 99',
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not a valid email',
      },
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
  },
  { timestamps: true }
);
export const UserModel = model<User>('User', userSchema);
