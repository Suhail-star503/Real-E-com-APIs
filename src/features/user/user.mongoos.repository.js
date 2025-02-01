import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import userSchema from './user.schema.js';

const Usermodel = mongoose.model('users', userSchema);

export default class userrepository {
  static async signup(user) {
    try {
      const newuser = new Usermodel(user);
      await newuser.save();
      return newuser;
    } catch (error) {
      console.log(error);
      throw new Error("Error signing up user");
    }
  }

  static async login(email, password) {
    try {
      let user1 = await this.getbyemail1(email);
      if (!user1) {
        return null;
      } else {
        const result = await bcrypt.compare(password, user1.password);
        return result ? user1 : null; // Return user1 if password matches, otherwise null
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getbyemail1(email) {
    try {
      const user = await Usermodel.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}