import Skeleton from "react-loading-skeleton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { PostOrPage } from "@tryghost/content-api";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import React from "react";
import useScrollSpy from "../../basic/ScrollSpy";
import StickyBox from "react-sticky-box";
import { Link } from "react-scroll";

interface TableOfContentsEntry {
  ref: React.Ref<unknown>;
  title: string;
  id: string;
  level: number;
}

type TableOfContents = TableOfContentsEntry[];

interface DeepTableOfContentsEntry extends TableOfContentsEntry {
  flatIndex: number;
  children: DeepTableOfContentsEntry[];
}

function inflateTableOfContents(
  table: TableOfContentsEntry[]
): DeepTableOfContentsEntry[] {
  let output: DeepTableOfContentsEntry[] = [];

  table
    .map((entry, index) => {
      let deepEntry: DeepTableOfContentsEntry = {
        flatIndex: index,
        children: [],
        ...entry,
      };
      return deepEntry;
    })
    .forEach((current) => {
      let previous = output[output.length - 1];

      if (previous && previous.level < current.level) {
        previous.children.push(current);
      } else {
        output.push(current);
      }
    });

  return output;
}

const TableOfContentsList: React.FunctionComponent<{
  table: TableOfContents;
  activeIndex: number;
  endIndex?: number;
}> = (props) => {
  const { table, activeIndex, endIndex } = props;

  const deepTableOfContents = inflateTableOfContents(table);

  return (
    <ul className="table-of-contents">
      {deepTableOfContents.map((entry, index, table) => {
        let next = table[index + 1];
        let isActive =
          activeIndex >= entry.flatIndex &&
          activeIndex < (next?.flatIndex || endIndex + 1 || Infinity);
        return (
          <li className={isActive ? "active" : ""} key={index}>
            <Link
              smooth={true}
              duration={500}
              to={entry.id}
              href={`#${entry.id}`}
            >
              {entry.title}
            </Link>
            {entry.children ? (
              <TableOfContentsList
                table={entry.children}
                activeIndex={activeIndex}
                endIndex={entry.flatIndex + entry.children.length}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

const ArticleBody: React.FunctionComponent<{
  data: PostOrPage | null;
  loading?: boolean;
  scrollSpy?: boolean;
}> = (props) => {
  const { data, loading = false, scrollSpy = false } = props;

  const headingRegex = /^h[0-6]$/;

  let tableOfContents: TableOfContents = [];

  function transform(node, index) {
    if (headingRegex.test(node.name)) {
      const element = convertNodeToElement(node, index, transform);
      const ref = React.createRef();

      tableOfContents.push({
        ref,
        title: element.props.children,
        id: element.props.id,
        level: parseInt(node.name.replace(/^\D+/g, "")),
      });

      /**
       * Use node.name in order to match the <h1>, <h2>, <h3> ... tags.
       */
      return <node.name {...element.props} ref={ref} />;
    }

    if (node.name == "iframe") {
      return (
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={node.attribs?.src}
            allowFullScreen
          />
        </div>
      );
    }

    return convertNodeToElement(node, index, transform);
  }

  const parsedHtml = ReactHtmlParser(data?.html, { transform });

  const activeSection = useScrollSpy({
    sectionElementRefs: tableOfContents.map((entry) => entry.ref),
    offsetPx: -96,
    throttleMs: 50,
  });

  return (
    <section className="pt-6 pt-md-8">
      <Container>
        <Row>
          <Col
            xs={12}
            md={{
              span: 10,
              offset: scrollSpy ? 0 : 1,
            }}
            xl={{
              span: 8,
              offset: 2,
            }}
          >
            {loading ? (
              <div className="article-body">
                <h1>{<Skeleton />}</h1>
                <p>{<Skeleton count={5} />}</p>
              </div>
            ) : (
              <div className="article-body">{parsedHtml}</div>
            )}
          </Col>
          {scrollSpy ? (
            <Col xs={12} md={2} className="d-none d-md-block">
              <StickyBox offsetTop={96} offsetBottom={16}>
                <aside>
                  <TableOfContentsList
                    table={tableOfContents}
                    activeIndex={activeSection}
                  />
                </aside>
              </StickyBox>
            </Col>
          ) : null}
        </Row>
      </Container>
    </section>
  );
};

export default ArticleBody;
