import { Html } from "@elysiajs/html";

import { IName } from "../../types/name";

import BaseHtml from "../../components/BaseHtml";
import NameCard from "../../components/name/NameCard";

interface IProps {
  names: IName[];
}

export default function NamesPage({ names }: IProps) {
  return (
    <BaseHtml title="All Names">
      <article>
        <h1>All Names</h1>

        {names.map((name) => (
          <NameCard name={name} />
        ))}
      </article>
    </BaseHtml>
  );
}
