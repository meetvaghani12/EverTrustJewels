import { redirect } from "next/navigation";
import { categories } from "@/data/categories";
import { DiamondShape } from "@/types/diamond";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const validShapes: string[] = categories.map((c) => c.shape);
  if (!validShapes.includes(category)) {
    redirect("/categories");
  }
  redirect(`/diamonds?shapes=${category as DiamondShape}`);
}
