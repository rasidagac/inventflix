import { ComponentPreview, Previews } from "@react-buddy/ide-toolbox";
import { PaletteTree } from "./palette";
import Root from "../routes/root";
import Movies from "../routes/movies";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/">
        <Root />
      </ComponentPreview>
      <ComponentPreview path="/Movies">
        <Movies />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
