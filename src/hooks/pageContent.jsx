import React, { useContext, useState } from "react";

export const DefaultHtml = `<!DOCTYPE html>
<html lang="en">
<body>
  <h1 style="margin-top: 3em; text-align: center">Hello, World!</h1>
</body>
</html>`;

const PageContentContext = React.createContext();

export function PageContentProvider({ children }) {
  const [content, setContent] = useState(DefaultHtml);

  return (
    <PageContentContext.Provider value={[content, setContent]}>
      {children}
    </PageContentContext.Provider>
  );
}

export function usePageContent() {
  const context = useContext(PageContentContext);
  if (!context) {
    throw new Error("usePageContent must be used within a PageContentProvider");
  }
  return context;
}
