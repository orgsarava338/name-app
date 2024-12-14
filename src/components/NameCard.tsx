import { Html } from "@elysiajs/html";
import { IName } from "../types/name";

interface IProps {
  name: IName;
}

export default function NameCard({ name }: IProps) {
  return (
    <section id={`name-card-${name._id}`}>
      <div>
        <h2>{name.name.toUpperCase()}</h2>
        <p>Gender : {name.gender}</p>
        <p>NameInEnglish: {name.nameInEnglish}</p>
        <p>Description : {name.description}</p>
      </div>
      <div>
        <button
          hx-get={`/name/${name.nameInEnglish}`}
          hx-target="body"
          hx-swap="innerHTML"
          hx-push-url="true"
        >
          Read more --&gt;
        </button>
        {/* <button
          hx-get={`/name/${name.nameInEnglish}/edit`}
          hx-target="body"
          hx-swap="innerHTML"
          hx-push-url="true"
        >
          edit
        </button>
        <button hx-delete={`/api/name/${name._id}`}>delete</button> */}
      </div>

      <hr />
    </section>
  );
}
