<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Services\ProductService;

class ProductController extends Controller
{
    private $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    public function index()
    {
        return $this->productService->index();
    }
    public function store(ProductRequest $request)
    {
        return $this->productService->store($request->validated());
    }
    public function show(int $id)
    {
        return $this->productService->show($id);
    }

    public function update(ProductRequest $request, int $id)
    {
        return $this->productService->update($request->validated(), $id);
    }
    public function destroy(int $id)
    {
        return $this->productService->destroy($id);
    }
}
