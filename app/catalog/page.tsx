import CamperCard from "@/components/CamperCard/CamperCard";
import Container from "@/components/Container/Container";
import FiltersForm from "@/components/FiltersForm/FiltersForm";
import { getCampers } from "@/lib/api";
import css from "./page.module.css";
import clsx from "clsx";

export default async function Catalog() {
  const campers = await getCampers({});
  return (
    <Container>
      <section className={css.section}>
        <aside>
          <FiltersForm />
        </aside>
        <div className={css.campersListWrapper}>
          <ul className={css.campersList}>
            {campers.campers.map((camper) => (
              <li key={camper.id}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>
          <button
            className={clsx(css.loadMoreButton, "buttonClear")}
            type="button"
          >
            Load More
          </button>
        </div>
      </section>
    </Container>
  );
}
