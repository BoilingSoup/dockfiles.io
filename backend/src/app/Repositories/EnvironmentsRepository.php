<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Environments;
use Illuminate\Support\Facades\Cache;

class EnvironmentsRepository
{
    /**
     * Retrieve a CursorPaginator object of all Environments. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(string | null $cursor)
    {
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_INDEX])->remember(
            CACHE_KEYS::ENVIRONMENTS_INDEX_CURSOR_($cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                // likes ?
                // comments count ?
            )->orderBy("id")->cursorPaginate()
        );
    }

    /**
     * Retrieve Environment data by Category ID.
     *
     * @return array
     */
    public function show(int $id)
    {
        //
    }
}
