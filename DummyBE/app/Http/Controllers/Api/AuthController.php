<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function index()
    {
        //
        $users = User::all();
        $response = [
            'success' => false,
            'message' => "user list",
            'response' => Response::HTTP_OK,
            'auth'=> Auth::user(),
            'data' => $users
        ];
        return response()->json($response, Response::HTTP_OK);
    }

    public function register(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191',
            'email' => 'required|email|max:191|unique:users,email',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);
        } else {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            $token = $user->createToken($user->email . '_Token')->plainTextToken; //create token dokumentasi di sanctum
            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'register Successfully',
            ]);
        }
    }


    public function login(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:191',
            'password' => 'required|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($validator->fails()) {
            return response()->json([
                'validation_errors' => $validator->errors(),
            ]);

        } else {
            $user = User::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'invalid credensial',
                ]);
            } else {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'username' => $user->name,
                    'token' => $token,
                    'auth'=> auth()->user(), //tes aja 
                    'message' => 'Login Succesfully',
                ]);
            }
        }
    }


    public function logout()
    {
        //
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'logged out Successfully'
        ]);
    }

}
