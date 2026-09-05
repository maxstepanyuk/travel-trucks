import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";
import css from "./CatalogLoader.module.css";

export default function CatalogLoader() {
  return (
    <div className={css.container}>
      <LoaderSpinner />
      <div className={css.text}>
        <h2 className={css.heading}>Loading tracks...</h2>
        <p className={css.description}>
          Please wait while we fetch the best travel trucks for you
        </p>
      </div>
    </div>
  );
}
