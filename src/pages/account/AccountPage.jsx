import { useParams } from "react-router-dom";

export function AccountPage(props) {
  const { accountId } = useParams();
  return (
    <>
      <h1>FAST NEAR AI</h1>
      <div className="mb-3">Hello there {accountId}</div>
    </>
  );
}
