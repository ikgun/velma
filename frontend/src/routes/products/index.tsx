import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
})

function ProductsPage() {
  return (
    <>
      <div>this is where all products are</div>
      <div className="px-2 font-bold">
        <Link to="/products/new">Add new product</Link>
      </div>
    </>
  )
}
