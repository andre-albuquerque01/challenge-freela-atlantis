<?php

namespace App\Services;

use App\Http\Resources\GeneralResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

class ProductService
{
    public function index()
    {
        try {
            return ProductResource::collection(Product::paginate());
        } catch (\Exception $e) {
            return new GeneralResource(['message' => 'error'], 400);
        }
    }

    public function store(array $data)
    {
        try {
            Product::create($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            return new GeneralResource(['message' => 'error'], 400);
        }
    }
    public function show(int $id)
    {
        try {
            $product = Product::where('id', $id)->first();
            if (!$product) {
                return new GeneralResource(['message' => 'product not found']);
            }
            return new ProductResource($product);
        } catch (\Exception $e) {
            return new GeneralResource(['message' => 'error'], 400);
        }
    }

    public function update(array $data, int $id)
    {
        try {
            $product = Product::where('id', $id)->first();
            if (!$product) {
                return new GeneralResource(['message' => 'product not found']);
            }
            $product->update($data);
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            return new GeneralResource(['message' => 'error'], 400);
        }
    }
    public function destroy(int $id)
    {
        try {
            Product::where('id', $id)->delete();
            return new GeneralResource(['message' => 'success']);
        } catch (\Exception $e) {
            return new GeneralResource(['message' => 'error'], 400);
        }
    }
}
