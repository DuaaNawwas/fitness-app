<?php

namespace App\Http\Controllers;

use App\Models\CaloriesIn;
use App\Models\CaloriesOut;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CaloriesResource;
use Illuminate\Support\Facades\Validator;

class CaloriesController extends Controller
{
    use HttpResponses;

    // Get all data for calories consumed
    public function caloriesIn()
    {
        return CaloriesResource::collection(
            CaloriesIn::where('user_id', Auth::user()->id)->get()
        );
    }

    // Save calories consumed
    public function storeCaloriesIn(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'calories' => ['required'],

        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }

        $caloriesin = CaloriesIn::create(
            [
                'user_id' => Auth::user()->id,
                'calories' => $request->calories,
            ]
        );

        return new CaloriesResource($caloriesin);
    }

    // Get all data for calories burnt
    public function caloriesOut()
    {
        return CaloriesResource::collection(
            CaloriesOut::where('user_id', Auth::user()->id)->get()
        );
    }

    // Save calories burnt
    public function storeCaloriesOut(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'calories' => ['required'],

        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }

        $caloriesout = CaloriesOut::create(
            [
                'user_id' => Auth::user()->id,
                'calories' => $request->calories,
            ]
        );

        return new CaloriesResource($caloriesout);
    }
}
