
import { getById } from "@/app/action";
import { ProductInterface } from "@/app/page";
import UpdateProductComponent from "@/components/product/update-product";

type Params = Promise<{ id: number }>
export default async function ProductUpdate(props: { params: Params }) {
  const params = await props.params
  const id = await params.id;
  const data = await getById(id) as ProductInterface

  return (
    <div className="bg-forum-gradient-2 w-full h-[calc(100vh-64px)] flex flex-col items-center py-10">
      <UpdateProductComponent data={data} />
    </div>
  );
}
