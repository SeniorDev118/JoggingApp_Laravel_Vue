<?php

namespace App\Http\Controllers;

use App\Jogging;

use Illuminate\Http\Response;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class JoggingController extends Controller
{
  //
  public function __construct()
  {
      // $this->middleware('jogging:api')->only('logout','upload');
  }

  public function register(Request $request)
  {
    $this->validate($request, [
      // 'user_id' => 'required|max:255',
      'name' => 'required|max:255',
      'count' => 'required|max:255',
    ]);

    $jogging = new Jogging($request->all());
    $jogging->name = $request->name;
    $jogging->count = $request->count;
    $jogging->save();
    return response()->json([
      'registered' => true,
      'api_token' => $jogging->api_token
    ]);
  }

  public function getall()
  {
    $jogging = Jogging::all();
    return $jogging;
  }

  public function deleteitem(Request $request) {
    $data = Jogging::find( $request->id )->delete();
  }

  public function updateitem(Request $request) {
    $data = Jogging::where('id', $request->id)->first ();
    $data->name = $request->name;
    $data->count = $request->count;
    $data->save();
    return $data;
  }
}

