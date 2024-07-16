import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function ArticleCard({ article, path }: any) {

  return (
    <Link href={path}>
      <article className="flex flex-col space-y-2 p-4 rounded-md border h-full max-w-[350px] w-full">
        <div className="h-[17rem] overflow-hidden">
          <Image
            src={article?.image}
            alt={article?.title || "Article Image"}
            width={804}
            height={452}
            className="rounded-md object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div className="flex lg:flex-row w-full justify-between items-center">
            <h2 className="text-lg lg:text-xl font-bold">{article?.title}</h2>
          </div>
          <p className="text-muted-foreground text-sm flex-1 overflow-hidden">
            {article?.subtitle.split(" ").length > 50
              ? article.subtitle.split(" ").slice(0, 50).join(" ") + "..."
              : article.subtitle}
          </p>
          <p className="text-sm text-muted-foreground">
            {new Date(article?.created_at)?.toLocaleDateString()}
          </p>
        </div>
      </article>
    </Link>
  );
}
