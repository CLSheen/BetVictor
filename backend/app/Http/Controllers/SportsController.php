<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SportsController extends Controller
{
    public function getBetVictorJSON() {
        $response = Cache::remember('sports', '300', function() {
            $httpClient = new \GuzzleHttp\Client();
            $request = $httpClient->get("https://www.betvictor.com/bv_in_play/v2/en-gb/1/mini_inplay.json");
            return json_decode($request->getBody()->getContents());
        });

        return $response;
    }

    public function index() {
        $source = $this->getBetVictorJSON();

        return $source->sports;
    }

    public function showSport($sportId) {
        $source = $this->index();

        foreach($source as &$value) {
            if($value->id === intval($sportId)) {
                return $value;
            }
        }
    }

    public function showEvents($sportId) {
        $source = $this->showSport($sportId);
        $events = [];

        foreach ($source->comp as &$value) {
            foreach ($value->events as &$event) {
                array_push($events, $event);
            }
        }

        return $events;
    }

    public function showEvent($sportId, $eventId) {
        $source = $this->showEvents($sportId);

        foreach ($source as &$event) {
            if($event->id === intval($eventId)) {
                return $event;
            }
        }
    }
}
