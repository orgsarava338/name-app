import { Html } from "@elysiajs/html";

import BaseHtml from "../../components/BaseHtml";
import { IName } from "../../types/name";

interface IProps {
  name: IName;
}

export default function NamePage({ name }: IProps) {
  return (
    <BaseHtml title={`பெயர் - ${name.name}`}>
      <article id="name-page">
        <h1>Name - {name.name.toUpperCase()}</h1>
        <p>Created At : {name.createdAt?.toLocaleString()}</p>
        <p>Updated At : {name.updatedAt?.toLocaleString()}</p>
        <section>
          <h3>Name Details</h3>

          <p>Gender : {name.gender}</p>
          <p>NameInEnglish: {name.nameInEnglish}</p>
          <p>Description : {name.description}</p>
          <p>
            Related Names :{" "}
            {name.relatedNames?.map((relatedName) => (
              <p>
                {relatedName.name} | {relatedName.nameInEnglish}
              </p>
            ))}
          </p>
          <p>
            Categories :{" "}
            {name.categories?.map((cat) => (
              <p>{cat.name}</p>
            ))}
          </p>
          <p>
            Tags :{" "}
            {name.tags?.map((tag) => (
              <p>{tag.name}</p>
            ))}
          </p>
        </section>

        {/* <button
          hx-get={`/name/${name.nameInEnglish}/edit`}
          hx-target="body"
          hx-push-url="true"
        >
          edit
        </button>
        <button hx-delete={`/api/name/${name._id}`}>delete</button> */}

        <div
          id="comment-section"
          hx-get={`/api/comment/${name._id}`}
          hx-target="#comment-section"
          hx-trigger="load"
          hx-swap="outerHTML"
        >
          comment section will load here
        </div>
      </article>
    </BaseHtml>
  );
}
