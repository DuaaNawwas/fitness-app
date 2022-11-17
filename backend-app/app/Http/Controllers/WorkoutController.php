<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\WorkoutResource;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Validator;

class WorkoutController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return WorkoutResource::collection(
            Workout::where('user_id', Auth::user()->id)->get()
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'workout_id' => ['required'],
            'workout_name' => ['required'],
            'workout_categ' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }

        $workout = Workout::create(
            [
                'user_id' => Auth::user()->id,
                'workout_id' => $request->workout_id,
                'workout_name' => $request->workout_name,
                'workout_categ' => $request->workout_categ,
                'workout_equip' => $request->workout_equip,
            ]
        );

        return new WorkoutResource($workout);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Workout $workout)
    {
        if (Auth::user()->id !== $workout->user_id) {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $workout->delete();

        return $this->success('', 'Workout deleted successfully');
    }
}
