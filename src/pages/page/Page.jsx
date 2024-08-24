import { useParams } from "react-router-dom";
import { usePageContent } from "../../hooks/pageContent.jsx";
import "./Page.scss";

export function Page(props) {
  const { accountId, pageId } = useParams();
  const [content] = usePageContent();

  return (
    <iframe className="root-iframe" srcDoc={content} title="page-content" />
  );
}
