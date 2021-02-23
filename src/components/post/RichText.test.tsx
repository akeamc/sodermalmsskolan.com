import { render } from "@testing-library/react";
import React from "react";
import RichText from "./RichText";

const html = `
<h1>Title</h1>
<h2>Smaller title</h2>
<script>
alert("oof");
</script>
<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Cool video</a>
<figure>
  <img src="https://media1.tenor.com/images/467d353f7e2d43563ce13fddbb213709/tenor.gif?itemid=12136175" />
  <figcaption>my favorite gif</figcaption>
</figure>
<table>
  <thead>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </tbody>
</table>
<iframe width="560" height="315" src="https://www.youtube.com/embed/IvUU8joBb1Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<blockquote>deep quote</blockquote>
`;

describe("<RichText /> test", () => {
  it("renders as usual", () => {
    const result = render(<RichText html={html} />);

    expect(result.asFragment()).toMatchSnapshot();
  });

  it("returns a skeleton if there is no HTML", () => {
    const result = render(<RichText html="" />);

    expect(result.asFragment()).toMatchSnapshot();
  });
});
