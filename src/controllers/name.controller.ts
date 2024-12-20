import { Name } from "../db/models";
import { IName } from "../types/name";

export async function createName(name: IName) {
  console.log(name)
  return await Name.create(name);
}

export async function getAllNames(): Promise<IName[]> {
  return (await Name.find({ active: true })
    .populate("name nameInEnglish gender description categories author")
    .lean()) as unknown as IName[];
}

export async function getNameByname(name: string): Promise<IName> {
  try {
    const foundName = (await Name.findOne({
      $and: [
        { active: true },
        {
          $or: [
            { name: { $regex: `^${name}$`, $options: "i" } },
            {
              nameInEnglish: {
                $regex: `^${name}$`,
                $options: "i",
              },
            },
          ],
        },
      ],
    })
      .populate(
        "name nameInEnglish author gender description relatedNames tags comments createdAt updatedAt"
      )
      .lean()) as unknown as IName;

    if (!foundName) throw new Error(`name <code>${name}</code> not found`);

    return foundName;
  } catch (error) {
    throw error;
  }
}

export async function getNameToEdit(name: string): Promise<IName> {
  try {
    const foundName = (await Name.findOne({
      $or: [
        { name: { $regex: `^${name}$`, $options: "i" } },
        {
          nameInEnglish: {
            $regex: `^${name}$`,
            $options: "i",
          },
        },
      ],
    })
      .populate(
        "name nameInEnglish gender description relatedNames categories tags"
      )
      .lean()) as unknown as IName;

    if (!foundName) throw new Error(`name <code>${name}</code> not found`);

    return foundName;
  } catch (error) {
    throw error;
  }
}

export async function updateNameById(id: string, body: IName) {
  try {
    const { _id, name, createdAt, updatedAt, comments, ...update } = body;
    const updatedName = await Name.findByIdAndUpdate(id, update);
    if (!updatedName) throw new Error(`name <code>${name}</code> not found`);
  } catch (error) {
    throw error;
  }
}

export async function deleteNameById(id: string) {
  try {
    const deletedName = await Name.findByIdAndDelete(id);
    if (!deletedName) throw new Error(`name <code>${name}</code> not found`);
  } catch (error) {
    throw error;
  }
}
