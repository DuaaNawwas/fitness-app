<?php

namespace App\Http\Controllers;

use App\Models\BodyLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\BodyLogResource;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Validator;

class BodyLogController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BodyLogResource::collection(
            BodyLog::where('user_id', Auth::user()->id)->get()
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
            'weight' => ['required'],
            'bmi' => ['required'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }

        $log = BodyLog::create(
            [
                'user_id' => Auth::user()->id,
                'weight' => $request->weight,
                'bmi' => $request->bmi,
            ]
        );

        return new BodyLogResource($log);
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BodyLog $bodyLog)
    {
        if (Auth::user()->id !== $bodyLog->user_id) {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $bodyLog->update($request->all());

        return new BodyLogResource($bodyLog);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(BodyLog $bodyLog)
    {
        if (Auth::user()->id !== $bodyLog->user_id) {
            return $this->error('', 'You are not authorized to make this request', 403);
        }

        $bodyLog->delete();

        return $this->success('', 'Entry deleted successfully');
    }
}
