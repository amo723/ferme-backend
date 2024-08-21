import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

// mongoDB
// *******
export type UserDocument = Document & {
  username: string,
  password: string,
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
 name: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: 1,
  }
}, {
  collection: 'users'
});

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export interface User {
  id: string,
  names: string,
  gender: string,
  age: number,
  birthdate: Date,
  role: string,
}
