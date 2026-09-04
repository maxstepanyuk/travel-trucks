import CamperCard from "@/components/CamperCard/CamperCard";
import Container from "@/components/Container/Container";
import FiltersForm from "@/components/FiltersForm/FiltersForm";

export default function Catalog() {
  return (
    <Container>
      <h1>Catalog</h1>
      <FiltersForm />
      <ul style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
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
    </Container>
  );
}
