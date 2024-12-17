import { Category } from "../db/models";
import { ICategory } from "../types/name";

export async function getAllCategories(
  name: string = ""
): Promise<ICategory[]> {
  try {
    return (await Category.find({ name: { $regex: `^${name}`, $options: "i" } })
      .populate("_id name")
      .lean()) as unknown as ICategory[];
  } catch (error) {
    throw error;
  }
}

export async function createCategory(
  name: string,
  description: string = ""
): Promise<ICategory> {
  try {
    const existingCategory = await Category.findOne({ name })
      .populate("_id name")
      .lean();
    if (existingCategory) return existingCategory as unknown as ICategory;

    const category = await Category.create({ name, description });
    return category as unknown as ICategory;
  } catch (error) {
    throw error;
  }
}
