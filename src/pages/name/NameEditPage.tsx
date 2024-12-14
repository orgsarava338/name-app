import { Html } from "@elysiajs/html";

import BaseHtml from "../../components/BaseHtml";
import { IName } from "../../types/name";

interface IProps {
  name: IName;
}

export default function NameEditPage({ name }: IProps) {
  return (
    <BaseHtml title={`பெயர் - ${name.name} | EDIT`}>
      <h1>Edit name {name.name}</h1>

      <div id="message"></div>

      <form
        id="name-edit-form"
        hx-put={`/api/name/${name._id}`}
        hx-target="#message"
        hx-swap="innerHTML"
      >
        <div>
          <label for="nameInEnglish">NameInEnglish : </label>
          <input
            type="text"
            name="nameInEnglish"
            id="nameInEnglish"
            placeholder="nameInEnglish"
            required
            value={name.nameInEnglish || ""}
          />
        </div>

        <div>
          <label for="gender">Gender:</label>
          <select name="gender" id="gender" required>
            <option value="male" selected={name.gender === "male"}>
              Male
            </option>
            <option value="female" selected={name.gender === "female"}>
              Female
            </option>
            <option value="unisex" selected={name.gender === "unisex"}>
              Unisex
            </option>
          </select>
        </div>

        <div>
          <label for="description">Description : </label>
          <textarea
            rows="5"
            cols="50"
            name="description"
            id="description"
            placeholder="description"
            required
          >
            {name.description}
          </textarea>
        </div>

        <div>
          <label for="active">Active:</label>
          <input
            type="text"
            name="active"
            id="active"
            placeholder="true or false"
            value={name.active ? "true" : "false"}
            pattern="true|false"
            required
          />
        </div>

        <button type="submit">submit</button>
      </form>
    </BaseHtml>
  );
}
