import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <h1>hello world</h1>
      {/* render products */}
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
