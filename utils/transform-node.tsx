export const transformNode = (node: any) => {
  // Applying classes to paragraph tags
  if (node.type === "tag" && node.name === "p") {
    let className = "leading-7 text-sm";

    // Check if the paragraph is not a child of a list item
    if (!node.parent || node.parent.name !== "li") {
      className += " mt-6";
    }

    if (node.attribs.class) {
      className = `${node.attribs.class} ${className}`;
    }
    node.attribs.class = className;
  }

  // Example for adding classes to anchor tags
  if (node.type === "tag" && node.name === "a") {
    node.attribs.class =
      "font-medium text-primary underline underline-offset-4";
  }

  // Add more conditions for other tags as needed
  if (node.type === "tag" && node.name === "h1") {
    node.attribs.class =
      "scroll-m-20 text-xl font-medium pt-4 tracking-tight";
  }

  if (node.type === "tag" && node.name === "h2") {
    node.attribs.class =
      "mt-10 scroll-m-20 border-b pb-2 text-lg font-medium tracking-tight transition-colors first:mt-0";
  }

  if (node.type === "tag" && node.name === "h3") {
    node.attribs.class =
      "mt-8 scroll-m-20 text-md font-medium tracking-tight";
  }

  // Adding classes to unordered list tags
  if (node.type === "tag" && node.name === "ul") {
    node.attribs.class = "my-4 ml-6 list-disc [&>li]:mt-2";
  }

    // Adding classes to unordered list tags
    if (node.type === "tag" && node.name === "ol") {
      node.attribs.class = "my-4 ml-6 list-disc [&>li]:mt-2";
    }

  // Adding classes to list item tags
  if (node.type === "tag" && node.name === "li") {
    node.attribs.class = "mt-2";
  }

  // Adding classes to blockquote tags
  if (node.type === "tag" && node.name === "blockquote") {
    node.attribs.class = "mt-6 border-l-2 pl-6 italic";
  }

  if (node.type === "tag" && node.name === "code") {
    // Check if the code is not inside a pre tag (i.e., it's inline)
    if (!node.parent || node.parent.name !== "pre") {
      node.attribs.class = "relative rounded px-2 bg-muted font-mono text-sm font-medium";
    }
  }

  // Adding classes to pre tags (code blocks)
  if (node.type === "tag" && node.name === "pre") {
    node.attribs.class = "mb-4 mt-6 overflow-x-auto px-4 rounded border bg-black";

    // Find the code tag inside the pre tag and add classes to it
    const codeNode = node.children.find((child: any) => child.name === "code");
    if (codeNode) {
      codeNode.attribs.class = "relative rounded p-0 font-mono text-sm";
    }
  }

};
