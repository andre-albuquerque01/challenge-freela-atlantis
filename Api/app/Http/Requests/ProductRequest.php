<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => 'required|min:3|max:60|regex:/^[^<>]*$/',
            'description' => 'required|min:3|max:100|regex:/^[^<>]*$/',
            'preco' => 'required|max:60|regex:/^[^<>]*$/',
            'disponible' => 'required',
        ];

        if ($this->method() == 'PUT') {
            $rules["name"] = [
                "nullable",
                "min:3",
                "max:60",
            ];
            $rules["description"] = [
                "nullable",
                "min:3",
                "max:100",
            ];
            $rules["preco"] = [
                "nullable",
                "max:60",
            ];
            $rules["disponible"] = [
                "nullable",
            ];
        }

        return $rules;
    }
}
