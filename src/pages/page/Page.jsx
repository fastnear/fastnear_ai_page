import { useParams } from "react-router-dom";

export function Page(props) {
  const { accountId, pageId } = useParams();
  return (
    <>
      <h1>FAST NEAR AI</h1>
      <div className="mb-3">
        Hello there {accountId}!<br />
        Rendering {pageId}
      </div>
    </>
  );
}
