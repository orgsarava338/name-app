import { Html } from "@elysiajs/html";

import BaseHtml from "../../components/BaseHtml";

interface IProps {}

export default async function NameCreatePage({}: IProps) {
  return (
    <BaseHtml title={`பெயர் | NEW`}>
      <h1>New Name</h1>

      <div id="message"></div>

      <form
        id="name-create-form"
        hx-post="/api/name"
        hx-on="htmx:afterRequest: document.getElementById('name-create-form').reset()"
        hx-target="#message"
        hx-swap="innerHTML"
      >
        <div>
          <label for="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="name"
            required
          />
        </div>

        <div>
          <label for="nameInEnglish">NameInEnglish : </label>
          <input
            type="text"
            name="nameInEnglish"
            id="nameInEnglish"
            placeholder="nameInEnglish"
            required
          />
        </div>

        <div>
          <label for="gender">Gender:</label>
          <select name="gender" id="gender" required>
            <option value="">--select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div>
          <label for="description">Description : </label>
          <textarea
            name="description"
            id="description"
            placeholder="description"
            required
          />
        </div>

        <div>
          <label for="categories">Categories:</label>
          <input
            type="text"
            id="categories"
            name="categories"
            placeholder="Enter category"
            hx-get="/api/category"
            hx-trigger="keyup changed delay:500ms"
            hx-target="#categories-suggestions"
            hx-params="{'name': this.value}"
          />
          <div id="categories-suggestions"></div>
        </div>

        <div>
          <label for="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter tag"
            hx-get="/api/tag"
            hx-trigger="keyup changed"
            hx-target="#tags-suggestions"
            hx-params="{'name': this.value}"
          />
          <div id="tags-suggestions"></div>
        </div>

        <button type="submit">submit</button>
      </form>
    </BaseHtml>
  );
}
