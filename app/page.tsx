import { Teaser } from "./teaser";
import { SiteNav } from "./site/nav";
import { Sections } from "./site/sections";

export default function Home() {
  return (
    <>
      <SiteNav />
      <div id="top">
        <Teaser />
      </div>
      <Sections />
    </>
  );
}
