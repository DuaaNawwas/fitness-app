<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BodyLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'weight' => $this->weight,
                'bmi' => $this->bmi,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'relationships' => [
                'user_id' => (string) $this->user_id,
                'user name' => $this->user->name,
                'user email' => $this->user->email
            ]
        ];
    }
}
