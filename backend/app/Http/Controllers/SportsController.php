<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SportsController extends Controller
{
    public function getBetVictorJSON() {
        $request = Cache::remember('sports', '300', function() {
            $httpClient = new \GuzzleHttp\Client();
            return $httpClient->get("https://www.betvictor.com/bv_in_play/v2/en-gb/1/mini_inplay.json");
        });

        return $response = json_decode($request->getBody()->getContents());
    }

    public function index() {
        $source = $this->getBetVictorJSON();

        return $source->sports;
    }

    public function showSport($sportId) {
        $source = $this->index();

        foreach ($source as &$value) {
            if($value->id = $sportId) {
                return $value;
            }
        }
    }

    public function showEvent($sportId, $eventId) {
        $source = $this->showSport($sportId);

        foreach ($source->comp as &$value) {
            foreach ($value->events as &$event) {
                if($event->id = $eventId) {
                    return $event;
                }
            }
        }
    }
}
