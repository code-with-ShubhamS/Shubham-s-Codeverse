import { IconCloud } from "../components/magicui/icon-cloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "bootstrap",
  "react",
  "flutter",
  "android",
  "html5",
  "tsnode",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "cloudways",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "cloudinary",
  "androidstudio",
  "shadcnui",
  "figma",
];

export function IconClouds() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={images} />
    </div>
  );
}
