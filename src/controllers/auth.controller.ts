import { User } from "../db/models";
import { IUser } from "../types/user";

export async function createOrUpdateUser(user: IUser): Promise<IUser> {
  const { google_id, _id, role, active, ...userData } = user;

  const foundName = await User.findOne({ google_id: google_id }).lean();

  if (
    foundName !== null &&
    (foundName.name !== userData.name ||
      foundName.firstName !== userData.firstName ||
      foundName.lastName !== userData.lastName ||
      foundName.imageUrl !== userData.imageUrl)
  )
    return (await User.findOneAndUpdate(
      { google_id: google_id },
      { $set: userData }
    ).lean()) as unknown as IUser;

  if (foundName !== null) return foundName as unknown as IUser;

  return new User({ google_id, ...userData }).save() as unknown as IUser;
}
