import { render } from "@testing-library/react";
import { GifItem } from "../../src/components/GifItem";

describe("Prueba en <GifItem/>", () => {
  const title = "Un título";
  const url = "https://google.cl/";

  test("debe hacer match con el snapshot", () => {
    const { container } = render(<GifItem title={title} url={url} />);
    expect(container).toMatchSnapshot();
  });
});
