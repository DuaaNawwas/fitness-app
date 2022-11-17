<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'errors' => ['email' => 'Credentials do not match!'],
            ]);
        }

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API token of ' . $user->name)->plainTextToken
        ]);
    }

    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults(), 'min:8']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
        ]);
    }

    public function googleLogin(Request $request)
    {
        $finduser = User::where('email', $request->email)->first();

        if ($finduser) {
            return $this->success([
                'user' => $finduser,
                'token' => $finduser->createToken('API token of ' . $finduser->name)->plainTextToken
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'google_id' => $request->google_id
            ]);
            return $this->success([
                'user' => $user,
                'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
            ]);
        }
    }

    public function logout()
    {

        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'you logged out successfully.'
        ]);
    }

    public function user()
    {
        return $this->success([
            'user' => Auth::user(),
        ]);
    }
}
