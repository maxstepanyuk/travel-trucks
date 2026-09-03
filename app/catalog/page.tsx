import CamperCard from "@/components/CamperCard/CamperCard";
import Container from "@/components/Container/Container";

export default function Catalog() {
  return (
    <Container>
      <h1>Catalog</h1>
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
