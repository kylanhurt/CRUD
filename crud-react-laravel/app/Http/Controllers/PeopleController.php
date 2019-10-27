<?php

namespace App\Http\Controllers;
use DB;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\PeopleCollection;
use App\Http\Resources\PersonResource;
use App\Models\Person;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PeopleCollection(Person::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!ini_get("auto_detect_line_endings")) {
            ini_set("auto_detect_line_endings", '1');
        }
        $content = $request->file('file');
        try {
            $insertionData = [];
            $fileData = file_get_contents($content);
            // PHP_EOL may not actually be usable due to operating system differences
            $lines = explode(PHP_EOL, $fileData);
            array_shift($lines);
            foreach ($lines as $line) {
                $lineData = str_getcsv($line);
                $insertionData[] = [
                    'first_name' => $lineData[1],
                    'last_name' => $lineData[2],
                    'email_address' => $lineData[3],
                    'status' => $lineData[4]
                ];
            }
            Person::insert($insertionData);
            return new PeopleCollection(Person::all());
        } catch (Exception $e) {
            return response()->json(null, 422);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new PersonResource(Person::findOrFail($id));
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
        $person = Person::findOrFail($id);
        $person->update($request->all());

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();

        return response()->json(null, 204);
    }
}
