import CamperCard from "@/components/CamperCard/CamperCard";
import Container from "@/components/Container/Container";
import FiltersForm from "@/components/FiltersForm/FiltersForm";
import css from "./page.module.css";
import clsx from "clsx";

export default function Catalog() {
  return (
    <Container>
      <section className={css.section}>
        <aside>
          <FiltersForm />
        </aside>
        <div className={css.campersListWrapper}>
          <ul className={css.campersList}>
            <li>
              <CamperCard />
            </li>
            <li>
              <CamperCard />
            </li>
            <li>
              <CamperCard />
            </li>
            <li>
              <CamperCard />
            </li>
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
